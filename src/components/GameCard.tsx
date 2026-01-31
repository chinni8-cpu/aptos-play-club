import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Brain, Trophy, Coins } from 'lucide-react';

export interface Game {
  id: string;
  name: string;
  description: string;
  type: 'battle' | 'mind';
  betAmount: number;
  players: number;
  imageUrl?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
  index: number;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay, index }) => {
  const difficultyColors = {
    Easy: 'text-neon-green',
    Medium: 'text-neon-gold',
    Hard: 'text-destructive',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="game-card relative group"
      onClick={() => onPlay(game)}
    >
      {/* Card glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl opacity-0 group-hover:opacity-50 blur transition-opacity duration-500" />
      
      <div className="relative p-6 h-full flex flex-col">
        {/* Game type badge */}
        <div className="absolute top-4 right-4">
          <div className={`p-2 rounded-lg ${game.type === 'battle' ? 'bg-destructive/20 text-destructive' : 'bg-secondary/20 text-secondary'}`}>
            {game.type === 'battle' ? (
              <Swords className="w-5 h-5" />
            ) : (
              <Brain className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Game icon/image area */}
        <div className="w-full h-32 rounded-lg bg-gradient-to-br from-muted to-card flex items-center justify-center mb-4 overflow-hidden">
          <motion.div
            className="text-primary/30"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {game.type === 'battle' ? (
              <Swords className="w-16 h-16" />
            ) : (
              <Brain className="w-16 h-16" />
            )}
          </motion.div>
        </div>

        {/* Game info */}
        <h3 className="text-xl font-display text-foreground mb-2 group-hover:text-primary transition-colors">
          {game.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {game.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-neon-gold" />
            <span className={`text-sm font-medium ${difficultyColors[game.difficulty]}`}>
              {game.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {game.players} playing
            </span>
          </div>
        </div>

        {/* Bet amount and play button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-neon-gold" />
            <span className="font-display text-lg text-neon-gold text-glow-gold">
              {game.betAmount} APT
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground font-display text-sm rounded-lg"
          >
            PLAY
          </motion.button>
        </div>
      </div>

      {/* Neon border effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-xl border border-primary/50" />
      </div>
    </motion.div>
  );
};

export default GameCard;
