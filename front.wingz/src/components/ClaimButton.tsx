import { useWriteContract, useAccount } from 'wagmi';
import { Contract } from 'ethers';
import abi from '../utils/ABI-wingz.json';

// Cambia esto a la dirección de tu contrato
const contractAddress = '0x1BfcA9B33285bdbc9A7067f2Dec2Ee95cE4B8CcA'; 

export const useClaim = () => {
    const { address, isConnected } = useAccount(); // Obtener la dirección de la cuenta conectada
      
        // Hook para escribir en el contrato
        const { write, data, isLoading, isError } = useWriteContract({
          address: contractAddress,
          abi: abi,
          functionName: 'claim',
          args: isConnected ? [address] : [], // Usa un arreglo vacío si no está conectado
        });
      
        return {
          claim: write,
          data,
          isLoading,
          isError,
        };
      };