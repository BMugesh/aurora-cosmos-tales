import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpaceBackground } from "@/components/SpaceBackground";
import { StoryProgress } from "@/components/StoryProgress";
import { EnhancedActCard } from "@/components/EnhancedActCard";
import { PerspectiveSwitcher } from "@/components/PerspectiveSwitcher";
import { expandedStoryActs } from "@/data/expandedStoryData";
import { Choice, Character } from "@/types/storyTypes";
import { useGameState } from "@/hooks/useGameState";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Sparkles } from "lucide-react";
import gsap from "gsap";

const EnhancedStory = () => {
  const [currentActId, setCurrentActId] = useState(1);
  const [visitedActs, setVisitedActs] = useState<number[]>([1]);
  const navigate = useNavigate();
  const { gameState, updateGameState, switchPerspective, resetGameState, recordChoice } = useGameState();

  const currentAct = expandedStoryActs.find(act => {
    if (act.id !== currentActId) return false;
    if (act.conditionCheck) {
      return act.conditionCheck(gameState);
    }
    return true;
  });

  const fallbackAct = expandedStoryActs.find(act => act.id === currentActId);
  const displayAct = currentAct || fallbackAct;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    if (displayAct?.onEnter) {
      const updates = displayAct.onEnter(gameState);
      updateGameState(updates);
    }
  }, [currentActId]);

  const handleChoice = (choice: Choice, index: number) => {
    const reactions = {
      happy: "😊 Great choice!",
      sad: "😢 Oh no...",
      funny: "😄 Haha! That's silly!",
      excited: "🎉 Woohoo!",
      worried: "😰 Uh oh...",
      shocked: "😲 Wow!",
      determined: "💪 Let's do this!",
      scared: "😨 That's scary!"
    };

    toast(reactions[choice.reaction] || "✨ Interesting choice!");

    // Record the choice
    recordChoice(currentActId, index);

    // Update game state if needed
    if (choice.stateUpdate) {
      updateGameState(choice.stateUpdate);
    }

    // Move to next act
    setTimeout(() => {
      const nextActId = typeof choice.nextAct === "function" 
        ? choice.nextAct(gameState) 
        : choice.nextAct;
      
      setCurrentActId(nextActId);
      setVisitedActs([...visitedActs, nextActId]);
    }, 800);
  };

  const handleNext = () => {
    if (displayAct?.isEnding) {
      // Restart story
      setCurrentActId(1);
      setVisitedActs([1]);
      resetGameState();
      toast("🚀 Starting a new adventure!");
    }
  };

  const handlePerspectiveSwitch = (perspective: Character) => {
    switchPerspective(perspective);
    toast(`👁️ Now viewing from ${perspective === "aurora" ? "Aurora's" : "the Pilot's"} perspective!`);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (!displayAct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-comic">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" data-theme="cosmic">
      <SpaceBackground />
      
      {/* Cosmic Header */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/30 border-b-2 border-primary/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <motion.button
            onClick={handleBackToHome}
            className="btn btn-ghost btn-sm gap-2 font-comic neon-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </motion.button>
          
          <motion.h1 
            className="text-lg md:text-2xl font-bubble text-gradient flex items-center gap-2"
            animate={{ 
              textShadow: [
                "0 0 10px hsl(var(--primary) / 0.5)",
                "0 0 20px hsl(var(--secondary) / 0.8)",
                "0 0 10px hsl(var(--primary) / 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
            Aurora & The Lost Pilot
          </motion.h1>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </motion.div>
      
      <PerspectiveSwitcher 
        currentPerspective={gameState.currentPerspective}
        onSwitch={handlePerspectiveSwitch}
      />
      
      <StoryProgress 
        currentAct={visitedActs.length} 
        totalActs={expandedStoryActs.length} 
      />

      <div className="relative z-10 pt-28 pb-12 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentActId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <EnhancedActCard
              act={displayAct}
              gameState={gameState}
              onChoice={handleChoice}
              onNext={displayAct.isEnding ? handleNext : undefined}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedStory;
