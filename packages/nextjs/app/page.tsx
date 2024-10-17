"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useAccount } from "wagmi";
import { Address, AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

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
    <div className="flex h-full w-full max-w-full flex-col items-center px-4 md:px-8">
      <header className="w-full max-w-4xl mt-6 mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image src="/wingz.png" alt="wingz" width={50} height={50} />
          <span className="text-4xl text-blue-600 font-bold">WINGZ</span>
        </div>
        <div className="flex items-center gap-3">
          <Address address={connectedAddress} />
        </div>
      </header>

      <main className="w-full max-w-md flex flex-col items-center justify-center gap-6 rounded-xl bg-gray-100 px-4 py-8">


        <div className="w-full bg-blue-600 text-white rounded-2xl p-5">
          <div className="text-xs mb-1">Saldo de cuentas</div>
          <div className="text-4xl font-bold">WIN {balance?.toString() || "0.00"}</div>
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
