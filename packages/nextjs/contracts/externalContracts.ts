import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";
import { contractABI } from "./contractabi"; // Importar ABI del contrato en Base Sepolia


const externalContracts = {
  11155111: {
    MyContractOnBaseSepolia: {
      address: "0xFaB4814B17661853BE749Ddb1afCfbE7a937Ba30", // Dirección del contrato en Base Sepolia
      abi: contractABI, 
    },
  },
 
  43113: {
    MyContractOnAvalancheFuji: {
      address: "0x911bca4fA451b0331ce727d2F527bCedB1AE2C81",
      abi: contractABI, 
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
