import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Gamepad2 } from "lucide-react";
import ParticleField from "@/components/ParticleField";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background */}
      <div className="fixed inset-0 animated-gradient-bg" />
      <div className="fixed inset-0 grid-pattern opacity-20" />
      <ParticleField particleCount={20} />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <Gamepad2 className="w-24 h-24 text-primary text-glow-cyan" />
          </motion.div>

          <h1 className="text-8xl font-display font-bold text-primary text-glow-cyan mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-display text-foreground mb-4">
            GAME NOT FOUND
          </h2>
          
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like this level doesn't exist. Let's get you back to the action!
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-display rounded-lg transition-transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            RETURN HOME
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
