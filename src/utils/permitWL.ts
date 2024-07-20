import { ethers } from 'ethers';

// 假设这些是您的合约 ABI 和地址

const NFT_MARKET_ABI = [
  "function permitBuyNFT(bytes _permitWL, address buyer, uint256 deadline, tuple(uint256 tokenId, uint256 deadline) permitData, bytes _permit)"
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
const NFT_MARKET_ADDRESS = '0x843E582a8E439E770D18553942bAF1D3f10b0Ff1'; 

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
  
  const nonce = await erc20.nonces('0x922dB1A931327CA2680343eD2d5E4541669701e9');
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

  console.log("tokenSignature", tokenSignature);
  
  // const {
  //   v: tokenV,
  //   r: tokenR,
  //   s: tokenS
  // } = ethers.Signature.from(tokenSignature);

  // console.log("tokenV", tokenV);
  // console.log("tokenR", tokenR);
  // console.log("tokenS", tokenS);

  // 6. 调用 permitBuyNFT 函数
  const tx = await nftMarket.permitBuyNFT(
    "0xee99832b871892f1f1bab6904e388fd0718127179431bfcf388fe6d8ba333ea166c65ed1aa2e8e353da716a993a0232e0402211a56fea7694cf466607c2942861b",
    '0x922dB1A931327CA2680343eD2d5E4541669701e9',
    12832560866,
    { tokenId: tokenId, deadline: deadline },
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
  
  const tokenId = 4; // 要购买的 NFT 的 tokenId
  const price = ethers.parseEther('5'); // 假设价格是 5个 token

  await buyNFTWithPermit(provider, signer, tokenId, price);
}

