'use client';
import Footer from 'src/components/Footer';
import TransactionWrapper from 'src/components/TransactionWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import { ONCHAINKIT_LINK } from 'src/links';
import { useAccount } from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';
import { Basenames } from '../components/basenames';
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image';
import BalanceButton from '../components/BalanceButton';
import React from 'react';


export default function Page() {
  const { address } = useAccount();
  const account = useAccount();

  const [isClimbHovered, setIsClimbHovered] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (isClimbHovered) {
      const timer = setInterval(() => {
        setActiveStep((prev) => (prev < 4 ? prev + 1 : prev))
      }, 1000)
      return () => clearInterval(timer)
    } else {
      setActiveStep(0)
    }
  }, [isClimbHovered])

  const handleClimb = () => {
    console.log("Climb button clicked")
  }
  
  const handleTransfer = () => {
    console.log("Transfer button clicked")
  }

  const stairVariants = {
    visible: { opacity: 1, transition: { duration: 0.03 } },
    hidden: { opacity: 0, transition: { duration: 0.03 } }
  }
  
  
  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
          <a
            href={ONCHAINKIT_LINK}
            title="onchainkit"
            target="_blank"
            rel="noreferrer"
          >
     <div className="flex items-center space-x-2"> {/* Flex para alinear la imagen y el texto */}
    <Image
      src="/wingz.png"  // Ruta relativa dentro de la carpeta public
      alt="wingz"
      width={100}        // Ancho de la imagen
      height={100}       // Altura de la imagen
    />
    <span className="text-4xl text-blue-600 font-bold">WINGZ</span> {/* Texto al lado de la imagen */}
  </div>
</a>

          <div className="flex items-center gap-3">
            <SignupButton />
            {!address && <LoginButton />}
          
            {/* <h1>{result}</h1> */}
          </div>
        </div>
      </section>

      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">

  
<div className="flex flex-col space-y-4 h-auto w-[450px] max-w-full items-center justify-center rounded-xl">
  {/* Balance Button */}
    <div className="w-full">
    <BalanceButton />
    </div>


  {/* Climb Button */}
   <div 
    className="w-full"
    onMouseEnter={() => setIsClimbHovered(true)}
    onMouseLeave={() => setIsClimbHovered(false)}
  >
    <button 
      onClick={handleClimb}
      className="w-full bg-blue-600 hover:bg-blue-800 text-white rounded-2xl py-6 px-5 flex items-center justify-between"
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
              <rect x="0" y="20" width="24" height="4" fill="white"/>
              <rect x="6" y="15" width="18" height="3" fill="white"/>
              <rect x="12" y="10" width="12" height="3" fill="white"/>
              <rect x="18" y="5" width="6" height="3" fill="white"/>
            </motion.g>
          )}
        </AnimatePresence>
        {isClimbHovered && (
          <>
            <motion.rect 
              x="0" y="20" width="24" height="4" fill="white"
              initial="hidden"
              animate={activeStep >= 1 ? "visible" : "hidden"}
              variants={stairVariants}
            />
            <motion.rect 
              x="6" y="15" width="18" height="3" fill="white"
              initial="hidden"
              animate={activeStep >= 2 ? "visible" : "hidden"}
              variants={stairVariants}
            />
            <motion.rect 
              x="12" y="10" width="12" height="3" fill="white"
              initial="hidden"
              animate={activeStep >= 3 ? "visible" : "hidden"}
              variants={stairVariants}
            />
            <motion.rect 
              x="18" y="5" width="6" height="3" fill="white"
              initial="hidden"
              animate={activeStep >= 4 ? "visible" : "hidden"}
              variants={stairVariants}
            />
          </>
        )}
      </svg>
    </button>
  </div>

  {/* Transfer Button */}
  <button 
    onClick={handleTransfer}
    className="w-full bg-blue-600 hover:bg-blue-800 text-white rounded-2xl py-6 px-5 flex items-center justify-between"
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
      <path d="M5 19L19 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 5H19V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </motion.svg>
  </button> 
  </div>




        {address ? (
          <TransactionWrapper address={address} />
        ) : (
          <WalletWrapper
            className="w-[450px] max-w-full bg-blue-600 text-white hover:bg-blue-800"
            text="Sign in to transact"
          />
        )}
      </section>

      <Footer />
    </div>
  );
}
