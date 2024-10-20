# 🛫 WINGZ

<h4 align="center">
  Buy Air Tickets with Your Wallet
</h4>

🌎 WINGZ is an open-source platform designed to revolutionize air travel access through web3 technology in Latin America. It offers users greater accessibility and flexibility while serving as a reserve of value with liquidity.

💡 Built using blockchain technology, smart contracts, and a user-friendly interface.

- ✅ **Flexible Purchasing**: Buy, burn, sell, or transfer WINGZ tokens for air travel.
- 🪙 **Utility Token**: WINGZ (WIN) represents certain value  per token.
- 🎫 **NFT Ticketing**: Receive an immutable NFT with travel data upon burning tokens.
- 🌟 **Additional Benefits**: Use WINGZ for airport services, in-flight purchases, and more.


## Quickstart

To get started with WINGZ, follow the steps below:

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/maxi-ht/wingz.git
cd wingz
yarn install
```
2. Change to the correct branch:
```bash
git checkout wingz.for.avalanche
```

3. Set up the local blockchain network:

```bash
yarn chain
```

This command starts a local blockchain network for development and testing. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

4. Deploy the WINGZ smart contract:

```bash
yarn deploy
```

This command deploys the WINGZ smart contract to the local network. The contract is located in `packages/hardhat/contracts/WINGZ.sol` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script in `packages/hardhat/deploy` to deploy the contract.

5. Start the frontend application:

```bash
yarn start
```

Visit your app on: `http://localhost:3000`. You can configure the app settings in `packages/nextjs/scaffold.config.ts`.



## Why WINGZ?

WINGZ addresses the growing needs of digital nomads and remote workers in Latin America:

- 🌴 Mexico and Argentina are top destinations for digital nomads
- 💼 Remote work is on the rise, especially in tech and customer service sectors
- 🔓 Traditional airlines and flyer programs often lack flexibility

## Features

- **Token Purchase**: Buy WINGZ tokens representing flight value
- **Flexible Usage**: Burn tokens for flights or hold/transfer/sell them
- **NFT Ticketing**: Receive unique NFTs for booked flights
- **Additional Services**: Use WINGZ for various travel-related purchases

## Target Audience

The WINGZ buyer persona is a tech-savvy, blockchain enthusiast, often a digital nomad or remote worker, who values:

- Flexibility in travel planning
- Financial autonomy
- Accessible and liquid travel rewards
