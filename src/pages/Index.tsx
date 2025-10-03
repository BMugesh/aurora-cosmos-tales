import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SpaceBackground } from "@/components/SpaceBackground";
import { FloatingPlanet } from "@/components/FloatingPlanet";
import { Sparkles, Rocket, Star } from "lucide-react";
import spaceBackground from "@/assets/space-background.jpg";
import auroraCharacter from "@/assets/aurora-character.png";

const Index = () => {
  const navigate = useNavigate();

  const handleStartStory = () => {
    navigate("/story");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackground />
      
      {/* Hero Background Image */}
      <div 
        className="fixed inset-0 -z-5 opacity-40"
        style={{
          backgroundImage: `url(${spaceBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Floating Planets */}
      <FloatingPlanet 
        size={120} 
        color="hsl(280, 90%, 65%)" 
        className="top-20 right-20"
        delay={0}
      />
      <FloatingPlanet 
        size={80} 
        color="hsl(195, 92%, 62%)" 
        className="bottom-32 left-20"
        delay={2}
      />
      <FloatingPlanet 
        size={60} 
        color="hsl(158, 76%, 58%)" 
        className="top-1/3 left-1/4"
        delay={4}
        duration={10}
      />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Aurora Character */}
          <motion.div
            className="mb-8 flex justify-center"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img 
              src={auroraCharacter} 
              alt="Aurora" 
              className="w-64 h-64 object-contain"
              style={{
                filter: "drop-shadow(0 0 40px hsl(280, 90%, 65%))",
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-aurora">
              Aurora & The Lost Pilot
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl mb-12 text-foreground/90 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            An Interactive Space Adventure for Kids! ✨
          </motion.p>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="bg-card/60 backdrop-blur-md rounded-2xl p-6 border border-primary/30">
              <Rocket className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">8 Magical Acts</h3>
              <p className="text-muted-foreground">Journey through an epic space adventure</p>
            </div>

            <div className="bg-card/60 backdrop-blur-md rounded-2xl p-6 border border-accent/30">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-bold mb-2">Make Choices</h3>
              <p className="text-muted-foreground">Your decisions shape the story</p>
            </div>

            <div className="bg-card/60 backdrop-blur-md rounded-2xl p-6 border border-primary/30">
              <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Animated Fun</h3>
              <p className="text-muted-foreground">Characters come alive with magic</p>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 1.2, 
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <Button
              variant="cosmic"
              size="lg"
              onClick={handleStartStory}
              className="text-2xl px-12 py-8 rounded-full hover:animate-bounce"
            >
              <Rocket className="mr-2 w-8 h-8" />
              Start Your Adventure!
            </Button>
          </motion.div>

          {/* Floating Stars */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="fixed bottom-8 left-0 right-0 text-center text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-sm">
          Created with ✨ and 🚀 • A magical journey awaits!
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
