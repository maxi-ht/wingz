import Link from "next/link";
import { hardhat } from "viem/chains";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { Name } from '@coinbase/onchainkit/identity';

type AddressLinkWrapperProps = {
  children: React.ReactNode;
  disableAddressLink?: boolean;
  blockExplorerAddressLink?: string;
  address?: `0x${string}`; // Agrega la dirección como prop
  chain: any; // Puedes definir el tipo correcto para chain
};

export const AddressLinkWrapper = ({
  children,
  disableAddressLink,
  blockExplorerAddressLink,
  address,
  chain,
}: AddressLinkWrapperProps) => {
  const { targetNetwork } = useTargetNetwork();

  // Función para validar la dirección Ethereum
  const isValidAddress = (addr?: string) => {
    return addr && /^0x[a-fA-F0-9]{40}$/.test(addr);
  };

  return disableAddressLink ? (
    <>
      {children}
      {/* Renderiza <Name /> solo si hay una dirección válida */}
      {isValidAddress(address) && <Name address={address} chain={chain} />}
    </>
  ) : (
    <Link
      href={blockExplorerAddressLink || "#"}
      target={targetNetwork.id === hardhat.id ? undefined : "_blank"}
      rel={targetNetwork.id === hardhat.id ? undefined : "noopener noreferrer"}
    >
      {children}
      {/* Renderiza <Name /> solo si hay una dirección válida */}
      {isValidAddress(address) && <Name address={address} chain={chain} />}
    </Link>
  );
};
