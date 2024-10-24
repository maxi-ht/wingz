import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";
import { Abi } from "viem";
import { contractABI } from "./contractabi";


const localContractABI: Abi = contractABI as unknown as Abi; 

const externalContracts = {
  11155111: {
    MyContractOnBaseSepolia: {
      address: "0x6A1599262A6c519331978d17700adCE71c930276",
      abi: localContractABI,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
