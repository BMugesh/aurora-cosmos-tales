import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpaceBackground } from "@/components/SpaceBackground";
import { StoryProgress } from "@/components/StoryProgress";
import { ActCard } from "@/components/ActCard";
import { storyActs, Choice } from "@/data/storyData";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Story = () => {
  const [currentActId, setCurrentActId] = useState(1);
  const [visitedActs, setVisitedActs] = useState<number[]>([1]);
  const navigate = useNavigate();

  const currentAct = storyActs.find(act => act.id === currentActId);
  const totalActs = storyActs.length;

  useEffect(() => {
    // Scroll to top on act change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentActId]);

  const handleChoice = (choice: Choice) => {
    // Show reaction toast
    const reactions = {
      happy: "😊 Great choice!",
      sad: "😢 Oh no...",
      funny: "😄 Haha! That's silly!",
      excited: "🎉 Woohoo!",
      worried: "😰 Uh oh..."
    };

    toast(reactions[choice.reaction as keyof typeof reactions] || "✨ Interesting choice!");

    // Move to next act
    setTimeout(() => {
      setCurrentActId(choice.nextAct);
      setVisitedActs([...visitedActs, choice.nextAct]);
    }, 800);
  };

  const handleNext = () => {
    if (currentAct?.isEnding) {
      // Restart story
      setCurrentActId(1);
      setVisitedActs([1]);
      toast("🚀 Starting a new adventure!");
    } else {
      // Auto-progress if no choices
      const nextAct = storyActs.find(act => act.id === currentActId + 1);
      if (nextAct) {
        setCurrentActId(nextAct.id);
        setVisitedActs([...visitedActs, nextAct.id]);
      }
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (!currentAct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackground />
      
      <StoryProgress 
        currentAct={visitedActs.length} 
        totalActs={totalActs} 
      />

      <div className="relative z-10 pt-24 pb-12 px-4">
        <AnimatePresence mode="wait">
          <ActCard
            key={currentActId}
            act={currentAct}
            onChoice={handleChoice}
            onNext={currentAct.isEnding || !currentAct.choices ? handleNext : undefined}
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
            className="text-muted-foreground hover:text-foreground transition-colors underline"
          >
            ← Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Story;
