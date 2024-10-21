'use client';

import React from 'react';
import { Avatar, Identity, Name, Address, Badge } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';

interface DisplayBasenameProps {
  address: `0x${string}` | undefined;
}

export function Basenames({ address }: DisplayBasenameProps) {
  if (!address) {
    return null; // Ensure address is defined before rendering
  }

  return (
    <div className="flex items-center flex-shrink-0">
      <div className="flex-shrink-0">
        <Avatar address={address} chain={base} className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex flex-col">
        <Identity
          address={address}
          chain={base}
          schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
          className="bg-transparent"
        >
          <Name address={address} chain={base} className="text-sm font-bold text-black dark:text-white bg-transparent" />
          <Badge className="text-xs text-gray-500 bg-transparent" />
        </Identity>
      </div>
    </div>
  );
}