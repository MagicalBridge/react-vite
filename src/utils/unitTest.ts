import { ethers } from 'ethers'

export async function unitTest() {
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

  // 获取当前账户
  const address = await signer.getAddress()

  console.log('address', address)

  const contractAddress = '0xcA7d1278B83256105485074BF24fCf7BA74Bfea6'

  // 合约的 ABI

  const abi = [
    {
      type: 'constructor',
      inputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'BSC_HTX_Token',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'address',
          internalType: 'contract ERC20Upgradeable',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'BSC_TXR_Token',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'address',
          internalType: 'contract ERC20Upgradeable',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'BSC_USDT_Token',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'address',
          internalType: 'contract ERC20Upgradeable',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'DEPOSIT_AMOUNT',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'DIRECT_REWARD_AMOUNT',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'INDIRECT_REWARD_AMOUNT',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'MAX_TOTAL_REWARD_PER_DEPOSIT',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'SWAP_THRESHOLD',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'SWAP_USDT_TO_HTX_AMOUNT',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'accumulatedUSDTForSwap',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'bindUser',
      inputs: [
        {
          name: '_referrer',
          type: 'address',
          internalType: 'address',
        },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'claimDividends',
      inputs: [],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'deployTime',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'deposit',
      inputs: [
        {
          name: 'amount',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'dexRouter',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'address',
          internalType: 'contract IDexRouter',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'everyDayDividendAmountArr',
      inputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'getUserPendingDividends',
      inputs: [
        {
          name: '_user',
          type: 'address',
          internalType: 'address',
        },
      ],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'initialize',
      inputs: [
        {
          name: '_usdtToken',
          type: 'address',
          internalType: 'address',
        },
        {
          name: '_htxToken',
          type: 'address',
          internalType: 'address',
        },
        {
          name: '_trxToken',
          type: 'address',
          internalType: 'address',
        },
        {
          name: '_dexRouter',
          type: 'address',
          internalType: 'address',
        },
        {
          name: '_one_time_dividend',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'one_time_dividend',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'owner',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'address',
          internalType: 'address',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'pauseContract',
      inputs: [],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'paused',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'bool',
          internalType: 'bool',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'renounceOwnership',
      inputs: [],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'setEveryDayDividendAmount',
      inputs: [
        {
          name: '_everyDayDividend',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'setOneTimeDividend',
      inputs: [
        {
          name: '_amount',
          type: 'uint256',
          internalType: 'uint256',
        },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'transferOwnership',
      inputs: [
        {
          name: 'newOwner',
          type: 'address',
          internalType: 'address',
        },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'unpauseContract',
      inputs: [],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'users',
      inputs: [
        {
          name: '',
          type: 'address',
          internalType: 'address',
        },
      ],
      outputs: [
        {
          name: 'referrer',
          type: 'address',
          internalType: 'address',
        },
        {
          name: 'directReward',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'indirectReward',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'totalReward',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'depositCount',
          type: 'uint8',
          internalType: 'uint8',
        },
        {
          name: 'lastUpdateTime',
          type: 'uint256',
          internalType: 'uint256',
        },
        {
          name: 'isBound',
          type: 'bool',
          internalType: 'bool',
        },
        {
          name: 'hasDeposited',
          type: 'bool',
          internalType: 'bool',
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'event',
      name: 'ContractPaused',
      inputs: [
        {
          name: 'by',
          type: 'address',
          indexed: false,
          internalType: 'address',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'ContractUnpaused',
      inputs: [
        {
          name: 'by',
          type: 'address',
          indexed: false,
          internalType: 'address',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'Deposit',
      inputs: [
        {
          name: 'user',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'amount',
          type: 'uint256',
          indexed: false,
          internalType: 'uint256',
        },
        {
          name: 'depositCount',
          type: 'uint256',
          indexed: false,
          internalType: 'uint256',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'DividendsClaimed',
      inputs: [
        {
          name: 'user',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'claimAmount',
          type: 'uint256',
          indexed: false,
          internalType: 'uint256',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'Initialized',
      inputs: [
        {
          name: 'version',
          type: 'uint64',
          indexed: false,
          internalType: 'uint64',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'OwnershipTransferred',
      inputs: [
        {
          name: 'previousOwner',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'newOwner',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'RewardPaid',
      inputs: [
        {
          name: 'user',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'amount',
          type: 'uint256',
          indexed: false,
          internalType: 'uint256',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'RewardTransferFailed',
      inputs: [
        {
          name: 'user',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'amount',
          type: 'uint256',
          indexed: false,
          internalType: 'uint256',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'USDTSwappedToHTX',
      inputs: [
        {
          name: 'usdtAmount',
          type: 'uint256',
          indexed: false,
          internalType: 'uint256',
        },
        {
          name: 'htxAmount',
          type: 'uint256',
          indexed: false,
          internalType: 'uint256',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'UnclaimedDividendsUpdated',
      inputs: [
        {
          name: 'user',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'amount',
          type: 'uint256',
          indexed: false,
          internalType: 'uint256',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'UserBound',
      inputs: [
        {
          name: 'user',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'referrer',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
      ],
      anonymous: false,
    },
    {
      type: 'error',
      name: 'InvalidInitialization',
      inputs: [],
    },
    {
      type: 'error',
      name: 'NotInitializing',
      inputs: [],
    },
    {
      type: 'error',
      name: 'OwnableInvalidOwner',
      inputs: [
        {
          name: 'owner',
          type: 'address',
          internalType: 'address',
        },
      ],
    },
    {
      type: 'error',
      name: 'OwnableUnauthorizedAccount',
      inputs: [
        {
          name: 'account',
          type: 'address',
          internalType: 'address',
        },
      ],
    },
    {
      type: 'error',
      name: 'ReentrancyGuardReentrantCall',
      inputs: [],
    },
  ]

  // const deadline = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now

  // 调用者：买家
  const contract = new ethers.Contract(contractAddress, abi, signer)

  try {
    const ownerstr = await contract.BSC_USDT_Token()
    console.log('owner:', ownerstr)
  } catch (error) {
    console.error('Error:', error)
  }
}
