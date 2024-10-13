// contractConfig.js
export const wagmiContractConfig = {
    address: '0xFaB4814B17661853BE749Ddb1afCfbE7a937Ba30', // Dirección del contrato
    abi: [
      {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],  // Definición de inputs
        "name": "balanceOf",                                  // Nombre de la función
        "outputs": [{ "name": "balance", "type": "uint256" }], // Output esperado
        "type": "function"
      }
    ],
}