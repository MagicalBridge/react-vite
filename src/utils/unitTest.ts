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

   // 获取当前账户
  const address = await signer.getAddress();

  console.log("address", address);

  const contractAddress = "0xdd728f51Be5A699d8830892f80412335C7B88b66"

  // 合约的 ABI
  const abi = [
    "function verifyPermitSignature(bytes calldata signatureWL, address buyer, uint256 deadline) public view returns (address)",
  ]

  // const deadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now

  // 调用者：买家
  const contract = new ethers.Contract(contractAddress, abi, signer)

  try {
    const recoveredSigner = await contract.verifyPermitSignature(
      '0x0263be14303bec479bb55baab55825e149ea4a28594ad451eab34e74d752a15c1876ecaf486449ccd88f283057d93e5e1aea11ed2e521b49cc8023addfcb3c8a1b',
      '0x922dB1A931327CA2680343eD2d5E4541669701e9',
      12832553311
    )

    console.log("Recovered Signer:", recoveredSigner)

  } catch (error) {
    console.error("Error:", error)
  }
}
