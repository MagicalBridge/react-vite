// import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
// import testSwap from "../utils/testSwap"
import { unitTest } from "../utils/unitTest"

interface Props {
  className?: string;
}

export default function CountBtn({ className }: Props) {
  const account = useAccount()
  const { disconnect } = useDisconnect()
  const { connectors, connect, status, error } = useConnect()
  const connector = connectors.find((connector) => connector.name === 'MetaMask')!;
  return (
    <>
      <div>{account.address}</div>
      {/* {
        account.status === 'connected' ? (
          <>
            <Button onClick={() => disconnect({ connector })} className={cn('', className)}>
              断开连接
            </Button>
          </>
        ) : (
          <Button onClick={() => connect({ connector })} className={cn('', className)}>
            钱包连接
          </Button>
        )
      } */}
      <Button onClick={() => unitTest()} className={cn('', className)}>
        测试交换
      </Button>
    </>
  );
}
