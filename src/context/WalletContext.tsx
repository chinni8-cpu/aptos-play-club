import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: number;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (amount: number) => Promise<boolean>;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    aptos?: {
      connect: () => Promise<{ address: string }>;
      disconnect: () => Promise<void>;
      account: () => Promise<{ address: string }>;
      isConnected: () => Promise<boolean>;
      signAndSubmitTransaction: (transaction: any) => Promise<any>;
      network: () => Promise<{ name: string }>;
    };
  }
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if Petra wallet is installed
  const isPetraInstalled = () => {
    return typeof window !== 'undefined' && window.aptos !== undefined;
  };

  // Check connection status on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isPetraInstalled()) {
        try {
          const isConnected = await window.aptos!.isConnected();
          if (isConnected) {
            const account = await window.aptos!.account();
            setAddress(account.address);
            setIsConnected(true);
            // Mock balance for demo - in production, fetch from blockchain
            setBalance(Math.random() * 100);
          }
        } catch (error) {
          console.log('Not connected to Petra wallet');
        }
      }
    };
    checkConnection();
  }, []);

  const connect = async () => {
    if (!isPetraInstalled()) {
      window.open('https://petra.app/', '_blank');
      throw new Error('Petra wallet not installed. Please install Petra wallet extension.');
    }

    setIsConnecting(true);
    try {
      const response = await window.aptos!.connect();
      setAddress(response.address);
      setIsConnected(true);
      // Mock balance for demo
      setBalance(Math.random() * 100);
    } catch (error) {
      console.error('Failed to connect:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    if (isPetraInstalled()) {
      try {
        await window.aptos!.disconnect();
      } catch (error) {
        console.error('Failed to disconnect:', error);
      }
    }
    setIsConnected(false);
    setAddress(null);
    setBalance(0);
  };

  const signTransaction = async (amount: number): Promise<boolean> => {
    if (!isPetraInstalled() || !isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      // This is a mock transaction for demo purposes
      // In production, you would create a real Move transaction
      const transaction = {
        type: 'entry_function_payload',
        function: '0x1::coin::transfer',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: [
          '0x1', // recipient address (would be game contract in production)
          (amount * 100000000).toString(), // amount in octas
        ],
      };

      const result = await window.aptos!.signAndSubmitTransaction(transaction);
      console.log('Transaction submitted:', result);
      return true;
    } catch (error) {
      console.error('Transaction failed:', error);
      return false;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
        signTransaction,
        isConnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
