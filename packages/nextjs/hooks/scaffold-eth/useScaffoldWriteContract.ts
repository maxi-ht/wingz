import { useState } from "react";
import { useAccount, useWriteContract, useConfig } from "wagmi";
import { useTargetNetwork } from "./useTargetNetwork";
import { useDeployedContractInfo, useTransactor } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { ContractName, ScaffoldWriteContractVariables } from "~~/utils/scaffold-eth/contract";

export const useScaffoldWriteContract = <TContractName extends ContractName>(
  contractName: TContractName
) => {
  const { chain } = useAccount();
  const { targetNetwork } = useTargetNetwork();
  const writeTx = useTransactor();
  const [isMining, setIsMining] = useState(false);
  const { data: deployedContractData } = useDeployedContractInfo(contractName);
  const config = useConfig();

  const writeContract = useWriteContract(config);
  console.log({config})
  const writeAsync = async (
    functionName: string,
    args: any[],
    options?: {
      value?: bigint;
      onBlockConfirmation?: (txnReceipt: any) => void;
      blockConfirmations?: number;
    }
  ) => {
    if (!deployedContractData) {
      notification.error("Target Contract is not deployed, did you forget to run `yarn deploy`?");
      return;
    }
    if (!chain?.id) {
      notification.error("Please connect your wallet");
      return;
    }
    if (chain?.id !== targetNetwork.id) {
      notification.error("You are on the wrong network");
      return;
    }

    try {
      setIsMining(true);
      const { blockConfirmations, onBlockConfirmation } = options || {};
      const result = await writeTx(
        () =>
          writeContract.writeContractAsync({
            abi: deployedContractData.abi,
            address: deployedContractData.address,
            functionName,
            args,
            value: options?.value,
          }),
        { blockConfirmations, onBlockConfirmation }
      );
      return result;
    } catch (e: any) {
      console.error(e);
      notification.error("Transaction failed");
    } finally {
      setIsMining(false);
    }
  };

  return {
    writeAsync,
    isMining,
  };
};