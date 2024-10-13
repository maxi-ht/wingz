'use client';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[90px] bg-blue-600 text-white hover:bg-blue-700"
      text="Log in"
      withWalletAggregator={true}
    />
  );
}
