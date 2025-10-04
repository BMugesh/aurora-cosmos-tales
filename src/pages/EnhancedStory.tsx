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
import { ArrowLeft } from "lucide-react";

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
      
      <PerspectiveSwitcher 
        currentPerspective={gameState.currentPerspective}
        onSwitch={handlePerspectiveSwitch}
      />
      
      <StoryProgress 
        currentAct={visitedActs.length} 
        totalActs={expandedStoryActs.length} 
      />

      <div className="relative z-10 pt-24 pb-12 px-4">
        <AnimatePresence mode="wait">
          <EnhancedActCard
            key={currentActId}
            act={displayAct}
            gameState={gameState}
            onChoice={handleChoice}
            onNext={displayAct.isEnding ? handleNext : undefined}
          />
        </AnimatePresence>

        {/* Back to Home Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={handleBackToHome}
            className="btn btn-ghost gap-2 text-lg font-comic"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedStory;
