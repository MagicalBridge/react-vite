import { ethers } from "ethers"

export async function unitTestNFT() {
  // 连接到以太坊提供者（例如 MetaMask）
  let provider, signer

  if (typeof window.ethereum !== "undefined") {
    // 使用 MetaMask 或类似的浏览器钱包
    await window.ethereum.request({ method: "eth_requestAccounts" })
    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner()
  } else {
    // 如果没有浏览器钱包，使用 JsonRpcProvider
    provider = new ethers.JsonRpcProvider("")
    signer = await provider.getSigner()
  }

   // 获取当前账户
  const address = await signer.getAddress();

  console.log("address", address);

  const contractAddress = "0x1667EC2B0AAd2E8968fd0Ad0bEeE1BeB20C4371F"

  // 合约的 ABI
  const abi = [
    "function verifyPermitNFTSignature(bytes calldata signatureNFT,address maker,uint256 tokenId,uint256 price,address payToken,address nft) public view returns (address,address)",
  ]

  // const deadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now

  // 调用者：买家
  const contract = new ethers.Contract(contractAddress, abi, signer)

  try {
    const recoveredSigner = await contract.verifyPermitNFTSignature(
      '0x96f45b68a31a733a02187dab38bd8deee6aae205771ac271062a8cd745d092855ab863e936b177b966ced97124d85d3ac40862b0241419c468707ac9ac5685ea1b',
      '0x2b754dEF498d4B6ADada538F01727Ddf67D91A7D',
      6,
      5,
      '0x3c510705cdbb9c2d8c6A68A44256fb331D1EDB56',
      '0xE7741Ca16f8399D06FC8069184a742E59F3e9bF5'
    )

    console.log("Recovered Signer:", recoveredSigner)

  } catch (error) {
    console.error("Error:", error)
  }
}
