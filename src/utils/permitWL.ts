import { ethers } from 'ethers';

// 假设这些是您的合约 ABI 和地址
const NFT_MARKET_ABI = [
  "constructor(address _tokenAddress, address _nftAddress)",
  "function eip712Domain() view returns (bytes1 fields, string name, string version, uint256 chainId, address verifyingContract, bytes32 salt, uint256[] extensions)",
  "function list(uint256 _tokenId, uint256 _price)",
  "function listings(uint256) view returns (address seller, uint256 price)",
  "function nftContract() view returns (address)",
  "function owner() view returns (address)",
  "function permitBuyNFT(tuple(uint256 tokenId, uint256 deadline) permitData, bytes _permitWL, bytes _permit)",
  "function renounceOwnership()",
  "function tokenContract() view returns (address)",
  "function tokenContractPermit() view returns (address)",
  "function transferOwnership(address newOwner)",
  "event EIP712DomainChanged()",
  "event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price)",
  "event NFTSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price)",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
  "error ECDSAInvalidSignature()",
  "error ECDSAInvalidSignatureLength(uint256 length)",
  "error ECDSAInvalidSignatureS(bytes32 s)",
  "error InvalidShortString()",
  "error OwnableInvalidOwner(address owner)",
  "error OwnableUnauthorizedAccount(address account)",
  "error StringTooLong(string str)"
];

const ERC20_ABI = [ 
  // ERC20 标准函数
  'function name() public view returns (string)',
  'function symbol() public view returns (string)',
  'function decimals() public view returns (uint8)',
  'function totalSupply() public view returns (uint256)',
  'function balanceOf(address account) public view returns (uint256)',
  'function transfer(address recipient, uint256 amount) public returns (bool)',
  'function allowance(address owner, address spender) public view returns (uint256)',
  'function approve(address spender, uint256 amount) public returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)',

  // EIP2612 特定函数
  'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) public',
  'function nonces(address owner) public view returns (uint256)',
  'function DOMAIN_SEPARATOR() public view returns (bytes32)'
];

const ERC20_ADDRESS = '0x3c510705cdbb9c2d8c6A68A44256fb331D1EDB56' // 您的 ERC20 Token 合约地址
const NFT_MARKET_ADDRESS = '0x367C7bD4843A20B80F71a9b83Fcf8223d88bE902'; // 您的 NFT Market 合约地址


async function buyNFTWithPermit(
  provider: ethers.Provider,
  signer: ethers.Signer,
  tokenId: number,
  price: bigint
) {
  const nftMarket = new ethers.Contract(NFT_MARKET_ADDRESS, NFT_MARKET_ABI, signer);
  const erc20 = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

  const buyerAddress = await signer.getAddress();

  // 1. 准备 permit 数据
  const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

  console.log(deadline);
  
  const nonce = await erc20.nonces(buyerAddress);
  const name = await erc20.name();
  const chainId = (await provider.getNetwork()).chainId;

  // 2. 创建 permit 消息
  const domain = {
    name: name,
    version: '1',
    chainId: chainId,
    verifyingContract: ERC20_ADDRESS
  };

  const types = {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' }
    ]
  };

  const tokenValue = {
    owner: buyerAddress,
    spender: NFT_MARKET_ADDRESS,
    value: price,
    nonce: nonce,
    deadline: deadline
  };

  // 3. 签名 permit 消息
  const tokenSignature = await signer.signTypedData(domain, types, tokenValue);
  
  const {
    v: tokenV,
    r: tokenR,
    s: tokenS
  } = ethers.Signature.from(tokenSignature);

  // 编码 ERC20 permit 数据
  const tokenPermitData = ethers.AbiCoder.defaultAbiCoder().encode(
    ['uint8', 'bytes32', 'bytes32'],
    [tokenV, tokenR, tokenS]
  );

  // 4. 准备白名单 permit 数据 (这里假设白名单检查使用相同的签名方法)
  const wlDomain = {
    name: 'NFTMarketPermitWL',
    version: '1',
    chainId: chainId,
    verifyingContract: NFT_MARKET_ADDRESS
  };

  console.log("wlDomain", wlDomain);
  

  const wlTypes = {
    PermitBuyNFTWL: [
      { name: 'owner', type: 'address' },
      { name: 'buyer', type: 'address' }
    ]
  };

  console.log("wlTypes", wlTypes);
  

  const wlMessage = {
    owner: await nftMarket.owner(),
    buyer: buyerAddress
  };

  console.log(wlMessage.owner);
  console.log(wlMessage.buyer);

  // 5. 签名白名单 permit 消息 (这里假设白名单签名由合约拥有者提供)
  // 注意：在实际应用中，这个签名应该由后端服务提供
  // const wlSignature = await signer.signTypedData(wlDomain, wlTypes, wlMessage);
  // const wlSig = ethers.Signature.from(wlSignature);  

  // 6. 调用 permitBuyNFT 函数
  const tx = await nftMarket.permitBuyNFT(
    { tokenId: tokenId, deadline: deadline },
    "0x9b2272de502b2c9692e66721593deb4a15c7a79ed1fd5d9e3962bb7b407b7def790fcdfc345686ef93f402504c3e523a7694725ca581e943d43554c0aede6dde1b",
    tokenSignature
  );

  // 7. 等待交易确认
  await tx.wait();

  console.log('NFT purchased successfully!');
}

// 使用示例
export async function main() {
  // 连接到以太坊提供者（例如 MetaMask）
  let provider, signer;

  if (typeof (window as any).ethereum !== 'undefined') {
    // 使用 MetaMask 或类似的浏览器钱包
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.BrowserProvider((window as any).ethereum);
    signer = await provider.getSigner();
  } else {
    // 如果没有浏览器钱包，使用 JsonRpcProvider
    provider = new ethers.JsonRpcProvider('');
    signer = await provider.getSigner();
  }
  
  const tokenId = 3; // 要购买的 NFT 的 tokenId
  const price = ethers.parseEther('5'); // 假设价格是 5个 token

  await buyNFTWithPermit(provider, signer, tokenId, price);
}
