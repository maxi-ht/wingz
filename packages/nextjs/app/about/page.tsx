import React from 'react';
import { Plane, Wallet, DollarSign, Ticket, Star } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-2 text-gray-800 dark:text-white">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

interface WhyWingzCardProps {
  emoji: string;
  text: string;
}

const WhyWingzCard: React.FC<WhyWingzCardProps> = ({ emoji, text }) => (
  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg flex items-center">
    <span className="text-2xl mr-2">{emoji}</span>
    <p className="text-gray-800 dark:text-gray-200">{text}</p>
  </div>
);

export default function WingzAboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">🛫 WINGZ</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Buy Air Tickets with Your Wallet</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            🌎 WINGZ is an open-source platform designed to revolutionize air travel access through web3 technology in Latin America. It offers users greater accessibility and flexibility while serving as a reserve of value.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            💡 Built using blockchain technology, smart contracts, and a user-friendly interface.
          </p>
        </div>

        <h2 className="text-3xl font-semibold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard 
            icon={<Wallet className="w-6 h-6 text-blue-500" />}
            title="Flexible Purchasing"
            description="Buy, burn, sell, or transfer WINGZ tokens for air travel."
          />
          <FeatureCard 
            icon={<DollarSign className="w-6 h-6 text-green-500" />}
            title="Utility Token"
            description="WINGZ (WIN) represents certain value per token."
          />
          <FeatureCard 
            icon={<Ticket className="w-6 h-6 text-purple-500" />}
            title="NFT Ticketing"
            description="Receive an immutable NFT with travel data upon burning tokens."
          />
          <FeatureCard 
            icon={<Star className="w-6 h-6 text-yellow-500" />}
            title="Additional Benefits"
            description="Use WINGZ for airport services, in-flight purchases, and more."
          />
        </div>

        <h2 className="text-3xl font-semibold text-center mb-8">Why WINGZ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <WhyWingzCard 
            emoji="🌴"
            text="Mexico and Argentina are top destinations for digital nomads"
          />
          <WhyWingzCard 
            emoji="💼"
            text="Remote work is on the rise, especially in tech and customer service sectors"
          />
          <WhyWingzCard 
            emoji="🔓"
            text="Traditional airlines and flyer programs often lack flexibility"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-semibold mb-6">More Features</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li><span className="font-semibold">Token Purchase:</span> Buy WINGZ tokens representing flight value</li>
            <li><span className="font-semibold">Flexible Usage:</span> Burn tokens for flights or hold/transfer/sell them</li>
            <li><span className="font-semibold">NFT Ticketing:</span> Receive unique NFTs for booked flights</li>
            <li><span className="font-semibold">Additional Services:</span> Use WINGZ for various travel-related purchases</li>
          </ul>
        </div>
      </div>
    </div>
  );
}