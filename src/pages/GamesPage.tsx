import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2, Swords, Brain, Coins, Trophy, Filter } from 'lucide-react';
import GameCard, { Game } from '@/components/GameCard';
import GameModal from '@/components/GameModal';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import ParticleField from '@/components/ParticleField';
import { useWallet } from '@/context/WalletContext';

const games: Game[] = [
  // Battle Games
  {
    id: 'arena-combat',
    name: 'Arena Combat',
    description: 'Face off in intense 1v1 battles. The last one standing wins the pot!',
    type: 'battle',
    betAmount: 0.5,
    players: 1234,
    difficulty: 'Medium',
  },
  {
    id: 'crypto-duel',
    name: 'Crypto Duel',
    description: 'Quick-draw dueling game. React faster than your opponent to claim victory.',
    type: 'battle',
    betAmount: 1,
    players: 856,
    difficulty: 'Hard',
  },
  {
    id: 'tank-wars',
    name: 'Tank Wars',
    description: 'Strategic tank battle with physics-based projectiles.',
    type: 'battle',
    betAmount: 0.25,
    players: 2145,
    difficulty: 'Easy',
  },
  {
    id: 'blade-runner',
    name: 'Blade Runner',
    description: 'Fast-paced runner with combat elements. Survive the longest to win.',
    type: 'battle',
    betAmount: 0.75,
    players: 967,
    difficulty: 'Medium',
  },
  {
    id: 'cosmic-clash',
    name: 'Cosmic Clash',
    description: 'Space combat in a procedurally generated galaxy.',
    type: 'battle',
    betAmount: 2,
    players: 543,
    difficulty: 'Hard',
  },
  // Mind Games
  {
    id: 'chess-masters',
    name: 'Chess Masters',
    description: 'Classic chess with crypto stakes. Outsmart your opponent in 10 minutes.',
    type: 'mind',
    betAmount: 1,
    players: 3421,
    difficulty: 'Hard',
  },
  {
    id: 'puzzle-rush',
    name: 'Puzzle Rush',
    description: 'Solve as many puzzles as you can before time runs out.',
    type: 'mind',
    betAmount: 0.25,
    players: 4532,
    difficulty: 'Easy',
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Test your memory in this fast-paced card matching game.',
    type: 'mind',
    betAmount: 0.5,
    players: 2876,
    difficulty: 'Medium',
  },
  {
    id: 'word-wizard',
    name: 'Word Wizard',
    description: 'Create words faster and longer than your competitor.',
    type: 'mind',
    betAmount: 0.3,
    players: 1987,
    difficulty: 'Medium',
  },
  {
    id: 'crypto-sudoku',
    name: 'Crypto Sudoku',
    description: 'Race to complete the Sudoku puzzle before your opponent.',
    type: 'mind',
    betAmount: 0.4,
    players: 1543,
    difficulty: 'Easy',
  },
];

const GamesPage: React.FC = () => {
  const { balance, isConnected } = useWallet();
  const [filter, setFilter] = useState<'all' | 'battle' | 'mind'>('all');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const filteredGames = games.filter((game) => {
    if (filter === 'all') return true;
    return game.type === filter;
  });

  const totalPlayers = games.reduce((acc, game) => acc + game.players, 0);
  const battleGames = games.filter((g) => g.type === 'battle').length;
  const mindGames = games.filter((g) => g.type === 'mind').length;

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 animated-gradient-bg" />
      <div className="fixed inset-0 grid-pattern opacity-20" />
      <ParticleField particleCount={30} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-border/30">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gamepad2 className="w-8 h-8 text-primary" />
              </motion.div>
              <span className="font-display text-lg text-foreground hidden sm:block">
                DECENTRALIZED GAMING CLUB
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {isConnected && (
                <div className="glass-card px-4 py-2 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-neon-gold" />
                  <span className="font-display text-neon-gold">
                    {balance.toFixed(2)} APT
                  </span>
                </div>
              )}
              <ConnectWalletButton variant="nav" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: Gamepad2, label: 'Total Games', value: games.length, color: 'text-primary' },
              { icon: Swords, label: 'Battle Games', value: battleGames, color: 'text-destructive' },
              { icon: Brain, label: 'Mind Games', value: mindGames, color: 'text-secondary' },
              { icon: Trophy, label: 'Active Players', value: `${(totalPlayers / 1000).toFixed(1)}K`, color: 'text-neon-gold' },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xl font-display ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-8"
          >
            <Filter className="w-5 h-5 text-muted-foreground" />
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All Games', icon: Gamepad2 },
                { key: 'battle', label: 'Battle', icon: Swords },
                { key: 'mind', label: 'Mind', icon: Brain },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === tab.key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Games grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                index={index}
                onPlay={(g) => setSelectedGame(g)}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <Gamepad2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-display text-foreground mb-2">
                No games found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different filter
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          isOpen={!!selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
};

export default GamesPage;
