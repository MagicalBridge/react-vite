import { ethers } from "ethers"

export async function unitTest() {
  // 连接到以太坊提供者（例如 MetaMask）
  let provider, signer

  if (typeof (window as any).ethereum !== "undefined") {
    // 使用 MetaMask 或类似的浏览器钱包
    await (window as any).ethereum.request({ method: "eth_requestAccounts" })
    provider = new ethers.BrowserProvider((window as any).ethereum)
    signer = await provider.getSigner()
  } else {
    // 如果没有浏览器钱包，使用 JsonRpcProvider
    provider = new ethers.JsonRpcProvider("")
    signer = await provider.getSigner()
  }

  const contractAddress = "0xAd51e186Df7eA89fBef78E46bd6B669398Cb8C9D"

  // 合约的 ABI
  const abi = [
    "function verifyPermitSignature(bytes calldata signature, address buyer, uint256 deadline) public view returns (address)",
    "function owner() view returns (address)",
  ]

  // const deadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now

  // 调用者：买家
  const contract = new ethers.Contract(contractAddress, abi, signer)

  try {
    // 调用合约方法
    // 第一个参数传入
    const recoveredSigner = await contract.verifyPermitSignature(
      "0x224a89cb44086256beb4149dede969a2ff506d3fea9c56d484bcd4faf36c40807f783150e547ec8617f4f6cd0d36181ca40c77cb4de2099bad696f369fb840ed1c",
      "0x922dB1A931327CA2680343eD2d5E4541669701e9",
      12832470521
    )

    console.log("Recovered Signer:", recoveredSigner)

  } catch (error) {
    console.error("Error:", error)
  }
}
