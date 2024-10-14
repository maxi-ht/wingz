import React, { useState } from 'react';
import { useBalance, useAccount } from 'wagmi';

export default function BalanceButton() {
  // Obtener la cuenta conectada
  const { address, isConnected } = useAccount();

  // Estado para almacenar el balance
  const [balance, setBalance] = useState<string | undefined>(undefined);

  // Estado para controlar si se está cargando
  const [isLoading, setIsLoading] = useState(false);

  // Función para actualizar el balance
  const updateBalance = () => {
    if (!isConnected || !address) {
      setBalance('Not connected');
      return;
    }

    setIsLoading(true); // Mostrar "Loading" mientras se obtiene el balance

    const { data: newBalance, isError } = useBalance({
      address, // Usamos la dirección del usuario conectado
    });

    if (!isError && newBalance) {
      setBalance(newBalance?.formatted);
    } else {
      setBalance('Error');
    }

    setIsLoading(false); // Detener la carga
  };

  return (
    <div className="flex flex-col w-full max-w-[450px] items-center justify-center rounded-xl">
      {/* Botón para actualizar el balance */}
      <button
        onClick={updateBalance} // Dispara la función de actualizar balance al hacer clic
        className="w-full bg-blue-600 hover:bg-blue-800 text-white rounded-2xl py-6 px-5 flex justify-between items-center"
      >
        <div className="text-3xl font-bold">Balance</div>
        <div className="text-4xl font-bold">
          {isLoading ? 'Loading...' : balance ? balance : 'No balance'}
        </div>
      </button>
    </div>
  );
}
