import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CharacterAnimation } from "./CharacterAnimation";
import { Act, Choice, GameState } from "@/types/storyTypes";
import { Sparkles } from "lucide-react";

interface EnhancedActCardProps {
  act: Act;
  gameState: GameState;
  onChoice: (choice: Choice, index: number) => void;
  onNext?: () => void;
}

export const EnhancedActCard = ({ act, gameState, onChoice, onNext }: EnhancedActCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const getText = () => {
    if (typeof act.text === "function") {
      return act.text(gameState);
    }
    return act.text;
  };

  const getEndingMessage = () => {
    switch (act.endingType) {
      case "unity":
        return { emoji: "🎉✨", text: "United Forever!", color: "text-success" };
      case "betrayal":
        return { emoji: "😱💔", text: "Trust Broken!", color: "text-error" };
      case "sacrifice":
        return { emoji: "💝😢", text: "Ultimate Sacrifice!", color: "text-warning" };
      case "isolation":
        return { emoji: "🌟💫", text: "A New Path!", color: "text-info" };
      case "funny":
        return { emoji: "🤪😂", text: "The Silliest Ending!", color: "text-accent" };
      default:
        return { emoji: "🎊", text: "The End!", color: "text-primary" };
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="max-w-5xl mx-auto p-4 md:p-6"
      style={{ opacity, scale }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="card bg-base-200/95 backdrop-blur-lg shadow-2xl border-4 border-primary/40">
        {/* Title Section */}
        <motion.div
          className="card-body p-6 md:p-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <h2 className="card-title text-3xl md:text-5xl font-bubble text-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-primary animate-pulse-glow" />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {act.title}
            </span>
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-accent animate-pulse-glow" />
          </h2>

          {/* Characters Container */}
          <div className="flex justify-around items-end py-8 px-4 min-h-[250px] md:min-h-[350px] bg-gradient-to-b from-secondary/20 to-transparent rounded-2xl mb-6">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CharacterAnimation
                character="aurora"
                emotion={act.characterEmotion}
                actId={act.id}
                className="w-28 h-28 md:w-44 md:h-44 lg:w-56 lg:h-56"
              />
              <p className="text-center mt-2 font-comic text-primary font-bold">Aurora</p>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <CharacterAnimation
                character="pilot"
                emotion={act.pilotEmotion}
                actId={act.id}
                className="w-28 h-28 md:w-44 md:h-44 lg:w-56 lg:h-56"
              />
              <p className="text-center mt-2 font-comic text-secondary font-bold">Pilot</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <CharacterAnimation
                character="plane"
                emotion="neutral"
                actId={act.id}
                className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40"
              />
              <p className="text-center mt-2 font-comic text-accent font-bold">Plane</p>
            </motion.div>
          </div>

          {/* Story Text */}
          <motion.div
            className="my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-base-300/50 p-6 md:p-8 rounded-2xl border-2 border-primary/20">
              <p className="text-lg md:text-2xl lg:text-3xl leading-relaxed text-base-content text-center font-comic">
                {getText()}
              </p>
            </div>
          </motion.div>

          {/* Choices or Ending */}
          <div className="card-actions justify-center flex-col gap-4 mt-6">
            {act.isEnding ? (
              <motion.div
                className="text-center w-full"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring", bounce: 0.6 }}
              >
                <div className="bg-gradient-to-r from-primary via-secondary to-accent p-8 rounded-3xl mb-6 shadow-2xl">
                  <h3 className={`text-4xl md:text-5xl font-bubble ${getEndingMessage().color} mb-3`}>
                    {getEndingMessage().emoji}
                  </h3>
                  <h3 className="text-3xl md:text-4xl font-bold text-base-100 mb-2">
                    {getEndingMessage().text}
                  </h3>
                  <p className="text-xl md:text-2xl text-base-100/90 font-comic">
                    What a magical adventure!
                  </p>
                </div>
                {onNext && (
                  <button
                    onClick={onNext}
                    className="btn btn-lg btn-primary text-xl md:text-2xl px-8 py-4 font-bubble"
                  >
                    🚀 Start New Adventure
                  </button>
                )}
              </motion.div>
            ) : act.choices && act.choices.length > 0 ? (
              <div className="space-y-4 w-full">
                <p className="text-center text-xl md:text-2xl font-bold text-primary font-bubble mb-4">
                  ✨ What should happen next? ✨
                </p>
                {act.choices
                  .filter(choice => !choice.perspectiveSpecific || choice.perspectiveSpecific === gameState.currentPerspective)
                  .map((choice, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.15, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => onChoice(choice, index)}
                        className="btn btn-lg w-full text-lg md:text-xl py-6 font-comic btn-outline btn-primary hover:btn-primary"
                      >
                        ✨ {choice.text}
                      </button>
                    </motion.div>
                  ))}
              </div>
            ) : onNext ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <button
                  onClick={onNext}
                  className="btn btn-lg btn-secondary text-xl md:text-2xl px-8 py-4 font-bubble"
                >
                  Continue Adventure →
                </button>
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
