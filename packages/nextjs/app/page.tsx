"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useAccount } from "wagmi";
import { Address, AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { Basenames } from '../components/Basenames';

const Home = () => {
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync } = useScaffoldWriteContract("Wingz");
  const [isClimbHovered, setIsClimbHovered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showTransferInputs, setShowTransferInputs] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isClimbHovered) {
      const timer = setInterval(() => {
        setActiveStep(prev => (prev < 4 ? prev + 1 : prev));
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setActiveStep(0);
    }
  }, [isClimbHovered]);

  // Hide transfer inputs when account is disconnected
  useEffect(() => {
    if (!connectedAddress) {
      setShowTransferInputs(false);
    }
  }, [connectedAddress]);

  const handleClaim = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet!");
      return;
    }

    const contractResponse = await writeContractAsync({
      functionName: "claim",
      args: [connectedAddress],
    });

    if (contractResponse) {
      notification.success("Claimed successfully!");
    }
  };

  const { data: balance } = useScaffoldReadContract({
    contractName: "Wingz",
    functionName: "balances",
    args: [connectedAddress],
    watch: true,
  });

  const handleTransfer = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet!");
      return;
    }

    // Toggle the visibility of transfer inputs
    setShowTransferInputs(prev => !prev);

    // If inputs are now hidden, reset the form
    if (showTransferInputs) {
      setRecipientAddress("");
      setAmount("");
      return;
    }
  };

  const handleSubmitTransfer = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet!");
      return;
    }

    if (!recipientAddress || recipientAddress.trim() === "") {
      notification.error("Please enter a valid recipient address!");
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      notification.error("Please enter a valid amount!");
      return;
    }

    try {
      const contractResponse = await writeContractAsync({
        functionName: "safeTransfer",
        args: [recipientAddress, amount],
      });

      if (contractResponse) {
        notification.success("Transfer successful!");
        setShowTransferInputs(false);
        setRecipientAddress("");
        setAmount("");
      }
    } catch (error) {
      notification.error("Transfer failed. Please try again.");
      console.error("Error during transfer:", error);
    }
  };

  const stairVariants = {
    visible: { opacity: 1, transition: { duration: 0.03 } },
    hidden: { opacity: 0, transition: { duration: 0.03 } },
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>

          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-6 px-5 flex items-center justify-between"
          onMouseEnter={() => setIsClimbHovered(true)}
          onMouseLeave={() => setIsClimbHovered(false)}
        >
          <span className="text-3xl font-bold">CLIMB</span>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-16"
          >
            <AnimatePresence>
              {!isClimbHovered && (
                <motion.g initial="visible" exit="hidden" variants={stairVariants}>
                  <rect x="0" y="20" width="24" height="4" fill="white" />
                  <rect x="6" y="15" width="18" height="3" fill="white" />
                  <rect x="12" y="10" width="12" height="3" fill="white" />
                  <rect x="18" y="5" width="6" height="3" fill="white" />
                </motion.g>
              )}
            </AnimatePresence>
            {isClimbHovered && (
              <>
                <motion.rect
                  x="0"
                  y="20"
                  width="24"
                  height="4"
                  fill="white"
                  initial="hidden"
                  animate={activeStep >= 1 ? "visible" : "hidden"}
                  variants={stairVariants}
                />
                <motion.rect
                  x="6"
                  y="15"
                  width="18"
                  height="3"
                  fill="white"
                  initial="hidden"
                  animate={activeStep >= 2 ? "visible" : "hidden"}
                  variants={stairVariants}
                />
                <motion.rect
                  x="12"
                  y="10"
                  width="12"
                  height="3"
                  fill="white"
                  initial="hidden"
                  animate={activeStep >= 3 ? "visible" : "hidden"}
                  variants={stairVariants}
                />
                <motion.rect
                  x="18"
                  y="5"
                  width="6"
                  height="3"
                  fill="white"
                  initial="hidden"
                  animate={activeStep >= 4 ? "visible" : "hidden"}
                  variants={stairVariants}
                />
              </>
            )}
          </svg>
        </button>

        <div className="w-full">
          <button
            onClick={handleTransfer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-6 px-5 flex items-center justify-between"
          >
            <span className="text-3xl font-bold">TRANSFER</span>
            <motion.svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-16"
              initial={{ x: 0, rotate: 0 }}
              whileHover={{ x: 10, rotate: 45 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <path d="M5 19L19 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 5H19V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>

          {showTransferInputs && connectedAddress && (
            <div className="mt-4 space-y-4">
              <AddressInput
                value={recipientAddress}
                onChange={setRecipientAddress}
                placeholder="Enter recipient address"
              />
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSubmitTransfer}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md py-2"
              >
                Submit Transfer
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
