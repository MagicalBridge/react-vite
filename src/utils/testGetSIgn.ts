import { ethers } from 'ethers';

export default async function testGetSIgn() {
  // 连接到以太坊提供者（例如 MetaMask）
  let provider, signer;

  if (typeof window.ethereum !== 'undefined') {
    // 使用 MetaMask 或类似的浏览器钱包
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
  } else {
    // 如果没有浏览器钱包，使用 JsonRpcProvider
    provider = new ethers.JsonRpcProvider('');
    signer = await provider.getSigner();
  }

  const chainId = (await provider.getNetwork()).chainId;
  
  const contractAddress = '0x843E582a8E439E770D18553942bAF1D3f10b0Ff1';
  
  // 1. 准备 permit 数据
  const deadline = Math.floor(Date.now() / 1000) + 11111111111; // 1 hour from now

  console.log("deadline", deadline);

  console.log(chainId);

  try {
    // 获取当前账户
    const address = await signer.getAddress();

    console.log("address", address);

    // 创建 permit 消息
    // 4. 准备白名单 permit 数据 (这里假设白名单检查使用相同的签名方法)
    const domain = {
      name: 'NFTMarketPermit',
      version: '1',
      chainId: chainId,
      verifyingContract: contractAddress,
    };

    const types = {
      PermitBuyNFTWL: [
        { name: 'buyer', type: 'address' },
        { name: 'deadline', type: 'uint256'}
      ],
    };

    const value = {
      buyer: '0x922dB1A931327CA2680343eD2d5E4541669701e9',
      deadline: deadline
    };

    // 签名 permit 消息
    const wlSignature = await signer.signTypedData(domain, types, value);

    console.log(wlSignature);

  } catch (error) {
    console.error('Error:', error);
  }
}