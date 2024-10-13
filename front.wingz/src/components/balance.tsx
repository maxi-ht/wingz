'use client';

import { useReadContract } from 'wagmi'
import { wagmiContractConfig } from '../utils/contractConfig';
import { Button } from "../components/ui/button"

export default function ReadContract() {
    const { data: balance } = useReadContract({
      address: wagmiContractConfig.address as `0x${string}`, // Aserción de tipo para dirección
      abi: wagmiContractConfig.abi,         // Se pasa el ABI directamente
      functionName: 'balanceOf',            // Función a llamar en el contrato
      args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF' as `0x${string}`], // Aserción de tipo para el argumento
    })

    return (
      <div>Balance: {balance?.toString()}
    
        <Button variant='ghost'>Click me</Button>
      </div>
    )
}