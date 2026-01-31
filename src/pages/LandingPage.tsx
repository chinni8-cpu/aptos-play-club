import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Swords, Brain, Zap, Users, Shield, ChevronDown } from 'lucide-react';
import ConnectWalletButton from '@/components/ConnectWalletButton';
import ParticleField from '@/components/ParticleField';
import LoadingScreen from '@/components/LoadingScreen';
import { useWallet } from '@/context/WalletContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const [showLoading, setShowLoading] = useState(false);

  // When wallet connects, show loading and navigate
  React.useEffect(() => {
    if (isConnected) {
      setShowLoading(true);
      setTimeout(() => {
        navigate('/games');
      }, 2500);
    }
  }, [isConnected, navigate]);

  if (showLoading) {
    return <LoadingScreen />;
  }

  const features = [
    {
      icon: Swords,
      title: 'Battle Games',
      description: 'Intense PvP combat games where skill determines the winner',
    },
    {
      icon: Brain,
      title: 'Mind Games',
      description: 'Strategic puzzles and brain teasers for crypto rewards',
    },
    {
      icon: Zap,
      title: 'Instant Payouts',
      description: 'Win APT coins instantly to your Petra wallet',
    },
    {
      icon: Shield,
      title: 'Fully Decentralized',
      description: 'Powered by Aptos blockchain for trustless gaming',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 animated-gradient-bg" />
      <div className="fixed inset-0 grid-pattern opacity-20" />
      <ParticleField />

      {/* Scanline effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ y: ['-100vh', '100vh'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
          <div className="glass-card max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gamepad2 className="w-8 h-8 text-primary" />
              </motion.div>
              <span className="font-display text-xl text-foreground">
                DECENTRALIZED GAMING CLUB
              </span>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Features
                </a>
                <a href="#games" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Games
                </a>
              </nav>
              <ConnectWalletButton variant="nav" />
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-24">
          <div className="max-w-5xl mx-auto text-center">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                Powered by Aptos Blockchain
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
            >
              <span className="text-foreground">DECENTRALIZED</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent text-glow-cyan">
                GAMING CLUB
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12"
            >
              Play exciting battle and mind games. Win APT coins. 
              All secured by the Aptos blockchain.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <ConnectWalletButton variant="hero" />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 mt-16"
            >
              {[
                { value: '10+', label: 'Games' },
                { value: '50K+', label: 'Players' },
                { value: '1M+', label: 'APT Won' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-display text-primary text-glow-cyan">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-8 h-8 text-muted-foreground" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
                WHY CHOOSE US
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the future of gaming with blockchain-powered rewards
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center group hover:border-primary/30 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                  >
                    <feature.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-display text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Games Preview Section */}
        <section id="games" className="py-24 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
                POPULAR GAMES
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect your wallet to start playing and earning APT
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Arena Combat', 'Chess Masters', 'Crypto Racer'].map((game, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="h-32 rounded-lg bg-gradient-to-br from-muted to-card mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-display text-foreground mb-2">{game}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Connect wallet to unlock
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-neon-gold font-display">0.5 APT</span>
                    <span className="text-xs text-muted-foreground">Entry Fee</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <ConnectWalletButton variant="hero" />
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-6 h-6 text-primary" />
                <span className="font-display text-foreground">
                  DECENTRALIZED GAMING CLUB
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                © 2024 DGC. Built on Aptos Blockchain.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
