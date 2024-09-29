import { ethers } from 'ethers'

export default async function testSwap() {
  // 连接到以太坊提供者（例如 MetaMask）
  let provider, signer

  if (typeof window.ethereum !== 'undefined') {
    // 使用 MetaMask 或类似的浏览器钱包
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner()
  } else {
    // 如果没有浏览器钱包，使用 JsonRpcProvider
    provider = new ethers.JsonRpcProvider('')
    signer = await provider.getSigner()
  }

  const chainId = (await provider.getNetwork()).chainId

  // const contractAddress = ''
  console.log(chainId)

  // Uniswap V2 Router ABI 和地址
  const uniswapV2RouterAbi = [
    // 仅添加我们需要调用的特定函数的ABI
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
  ]

  const uniswapV2RouterAddress = '0xd0F08FE0B691C6a7b280c8DD5C7bC6D44Ad35e35'

  const uniswapV2Router = new ethers.Contract(uniswapV2RouterAddress, uniswapV2RouterAbi, provider)

  const amountOutMin = ethers.parseUnits('1.0', 18) // Example value

  const path = ['0xf46F9847a153480C85BDa37251170f2A3C5A87a8', '0xA6f1076DdAfCD7DebdCeA36918C2E7C42dDd9b86']

  const userAddress = '0x2b754dEF498d4B6ADada538F01727Ddf67D91A7D' // Replace with the user's address
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from now

  let swapData = uniswapV2Router.interface.encodeFunctionData('swapExactETHForTokens', [
    amountOutMin,
    path,
    userAddress,
    deadline,
  ])

  swapData =
    '0x7ff36ab500000000000000000000000000000000000000000000000089312836e02fa40800000000000000000000000000000000000000000000000000000000000000800000000000000000000000002b754def498d4b6adada538f01727ddf67d91a7d0000000000000000000000000000000000000000000000000000000066f96eec0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000f46f9847a153480c85bda37251170f2a3c5a87a8000000000000000000000000a6f1076ddafcd7debdcea36918c2e7c42ddd9b86'

  try {
    const tx = await signer.sendTransaction({
      to: uniswapV2RouterAddress,
      data: swapData,
      value: ethers.parseEther('0.001'), // 发送 0.1 ETH
      gasLimit: 400000,
    })

    console.log('Transaction sent:', tx)

    const receipt = await tx.wait()
    console.log('Transaction confirmed:', receipt)
  } catch (error) {
    console.error('Error:', error)
  }
}
