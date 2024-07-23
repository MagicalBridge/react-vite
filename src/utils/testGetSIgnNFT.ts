import { ethers } from 'ethers';

export default async function testGetSIgnNFT() {
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
  
  const contractAddress = '0x1667EC2B0AAd2E8968fd0Ad0bEeE1BeB20C4371F';
  
  // 1. 准备 permit 数据
  // const deadline = Math.floor(Date.now() / 1000) + 11111111111;

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
      LimitOrder: [
        { name: 'maker', type: 'address' },
        { name: 'tokenId', type: 'uint256'},
        { name: 'price', type: 'uint256'},
        { name: 'payToken', type: 'address' },
        { name: 'nft', type: 'address' },
      ],
    };

    // console.log("deadline", deadline);

    const value = {
      maker: '0x2b754dEF498d4B6ADada538F01727Ddf67D91A7D',
      tokenId: 6,
      price: 5,
      payToken: '0x3c510705cdbb9c2d8c6A68A44256fb331D1EDB56',
      nft: '0xE7741Ca16f8399D06FC8069184a742E59F3e9bF5'
    };

    // 签名 permit 消息
    const wlSignature = await signer.signTypedData(domain, types, value);

    console.log(wlSignature);

  } catch (error) {
    console.error('Error:', error);
  }
}