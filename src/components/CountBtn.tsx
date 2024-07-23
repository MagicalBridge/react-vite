// import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
// import { main } from '@/utils/permitWL';
// import testPermitBuyNFT from '@/utils/permit'
// import testGetSIgn from '@/utils/testGetSIgn'
// import {unitTest} from '../utils/unitTest'
import {unitTestNFT} from '../utils/unitTestNFT'

interface Props {
  className?: string;
}

export default function CountBtn({ className }: Props) {
  // const [count, setCount] = useState(0);
  return (
    <Button onClick={() => {
      // main();
      // testGetSIgn();
      // unitTest()
      unitTestNFT()
    }} className={cn('', className)}>
      {
        "验证签名"
      }
    </Button>
  );
}
