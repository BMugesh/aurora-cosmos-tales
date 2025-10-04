import { motion } from "framer-motion";
import { Character } from "@/types/storyTypes";
import { Sparkles, User } from "lucide-react";

interface PerspectiveSwitcherProps {
  currentPerspective: Character;
  onSwitch: (perspective: Character) => void;
}

export const PerspectiveSwitcher = ({ currentPerspective, onSwitch }: PerspectiveSwitcherProps) => {
  return (
    <div className="fixed top-20 right-4 z-50 flex gap-2">
      <motion.button
        onClick={() => onSwitch("aurora")}
        className={`btn btn-circle ${currentPerspective === "aurora" ? "btn-primary" : "btn-ghost"}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Switch to Aurora's perspective"
      >
        <Sparkles className={currentPerspective === "aurora" ? "text-primary-content" : ""} />
      </motion.button>
      
      <motion.button
        onClick={() => onSwitch("pilot")}
        className={`btn btn-circle ${currentPerspective === "pilot" ? "btn-secondary" : "btn-ghost"}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Switch to Pilot's perspective"
      >
        <User className={currentPerspective === "pilot" ? "text-secondary-content" : ""} />
      </motion.button>
    </div>
  );
};
