import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@/context/WalletContext';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ConnectWalletButtonProps {
  variant?: 'hero' | 'nav';
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ 
  variant = 'hero' 
}) => {
  const { isConnected, address, connect, disconnect, isConnecting } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card px-4 py-2 flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="font-display text-sm text-foreground">
            {truncateAddress(address)}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-neon-green" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            )}
          </button>
        </motion.div>
        <Button
          onClick={disconnect}
          variant="outline"
          size="sm"
          className="border-destructive/50 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <motion.button
        onClick={connect}
        disabled={isConnecting}
        className="relative group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
        
        {/* Button content */}
        <div className="relative flex items-center gap-3 px-8 py-4 bg-background rounded-xl border border-primary/50 font-display text-lg">
          {isConnecting ? (
            <>
              <motion.div
                className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span className="text-primary">CONNECTING...</span>
            </>
          ) : (
            <>
              <Wallet className="w-6 h-6 text-primary" />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                CONNECT WALLET
              </span>
            </>
          )}
        </div>

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-primary/50"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    );
  }

  return (
    <Button
      onClick={connect}
      disabled={isConnecting}
      className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-display"
    >
      {isConnecting ? (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        <Wallet className="w-4 h-4 mr-2" />
      )}
      {isConnecting ? 'Connecting...' : 'Connect'}
    </Button>
  );
};

export default ConnectWalletButton;
