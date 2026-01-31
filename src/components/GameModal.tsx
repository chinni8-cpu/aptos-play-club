import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, AlertTriangle, Trophy, Coins, Loader2 } from 'lucide-react';
import { Game } from './GameCard';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';

interface GameModalProps {
  game: Game;
  isOpen: boolean;
  onClose: () => void;
}

type GameState = 'confirm' | 'approving' | 'playing' | 'result';

const GameModal: React.FC<GameModalProps> = ({ game, isOpen, onClose }) => {
  const { signTransaction, balance } = useWallet();
  const [gameState, setGameState] = useState<GameState>('confirm');
  const [isWinner, setIsWinner] = useState(false);
  const [winAmount, setWinAmount] = useState(0);

  const handleConfirmBet = async () => {
    setGameState('approving');
    
    try {
      const success = await signTransaction(game.betAmount);
      
      if (success) {
        setGameState('playing');
        
        // Simulate game playing
        setTimeout(() => {
          const won = Math.random() > 0.5;
          setIsWinner(won);
          setWinAmount(won ? game.betAmount * 2 : 0);
          setGameState('result');
        }, 3000);
      } else {
        setGameState('confirm');
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      setGameState('confirm');
    }
  };

  const handleClose = () => {
    setGameState('confirm');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl blur-lg opacity-50" />
          
          <div className="relative glass-card p-6 rounded-2xl">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Confirm bet state */}
            {gameState === 'confirm' && (
              <div className="text-center">
                <h2 className="text-2xl font-display text-foreground mb-2">
                  {game.name}
                </h2>
                <p className="text-muted-foreground mb-6">{game.description}</p>

                <div className="glass-card p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground">Entry Fee</span>
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-neon-gold" />
                      <span className="font-display text-xl text-neon-gold text-glow-gold">
                        {game.betAmount} APT
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Potential Win</span>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-neon-green" />
                      <span className="font-display text-xl text-neon-green">
                        {game.betAmount * 2} APT
                      </span>
                    </div>
                  </div>
                </div>

                {balance < game.betAmount && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg mb-4">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <span className="text-sm text-destructive">
                      Insufficient balance
                    </span>
                  </div>
                )}

                <Button
                  onClick={handleConfirmBet}
                  disabled={balance < game.betAmount}
                  className="w-full py-6 bg-gradient-to-r from-primary to-accent font-display text-lg"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  CONFIRM & PLAY
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  This will open Petra Wallet for transaction approval
                </p>
              </div>
            )}

            {/* Approving state */}
            {gameState === 'approving' && (
              <div className="text-center py-8">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-primary/30 border-t-primary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <h2 className="text-xl font-display text-foreground mb-2">
                  Waiting for Approval
                </h2>
                <p className="text-muted-foreground">
                  Please confirm the transaction in your Petra Wallet
                </p>
              </div>
            )}

            {/* Playing state */}
            {gameState === 'playing' && (
              <div className="text-center py-8">
                <motion.div
                  className="relative w-32 h-32 mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-primary/30" />
                  <div className="absolute inset-2 rounded-full border-4 border-accent/40" />
                  <div className="absolute inset-4 rounded-full border-4 border-secondary/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  </div>
                </motion.div>
                <h2 className="text-xl font-display text-primary text-glow-cyan mb-2">
                  GAME IN PROGRESS
                </h2>
                <p className="text-muted-foreground">
                  May the odds be in your favor...
                </p>
              </div>
            )}

            {/* Result state */}
            {gameState === 'result' && (
              <div className="text-center py-8">
                {isWinner ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-neon-gold to-neon-green flex items-center justify-center"
                    >
                      <Trophy className="w-12 h-12 text-background" />
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-3xl font-display text-neon-gold text-glow-gold mb-2"
                    >
                      YOU WON!
                    </motion.h2>
                    <p className="text-xl font-display text-neon-green mb-6">
                      +{winAmount} APT
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Winnings have been transferred to your wallet
                    </p>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-muted to-card flex items-center justify-center"
                    >
                      <X className="w-12 h-12 text-muted-foreground" />
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-display text-muted-foreground mb-2"
                    >
                      BETTER LUCK NEXT TIME
                    </motion.h2>
                    <p className="text-muted-foreground mb-6">
                      Don't give up - fortune favors the bold!
                    </p>
                  </>
                )}

                <Button
                  onClick={handleClose}
                  className="w-full py-6 bg-gradient-to-r from-primary to-accent font-display text-lg"
                >
                  CONTINUE
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameModal;
