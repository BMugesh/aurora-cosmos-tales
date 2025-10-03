import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CharacterAnimation } from "./CharacterAnimation";
import { Act, Choice } from "@/data/storyData";
import { Sparkles } from "lucide-react";

interface ActCardProps {
  act: Act;
  onChoice: (choice: Choice) => void;
  onNext?: () => void;
}

export const ActCard = ({ act, onChoice, onNext }: ActCardProps) => {
  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-primary/30 overflow-hidden">
        {/* Title */}
        <motion.div
          className="gradient-cosmic p-6 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <h2 className="text-4xl font-bold text-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8" />
            {act.title}
            <Sparkles className="w-8 h-8" />
          </h2>
        </motion.div>

        {/* Characters */}
        <div className="flex justify-around items-center py-8 px-4 bg-gradient-to-b from-secondary/50 to-transparent">
          <CharacterAnimation
            character="aurora"
            emotion={act.characterEmotion}
            className="w-32 h-32 md:w-48 md:h-48"
          />
          
          <CharacterAnimation
            character="pilot"
            emotion={act.pilotEmotion}
            className="w-32 h-32 md:w-48 md:h-48"
          />
          
          <CharacterAnimation
            character="plane"
            emotion="neutral"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>

        {/* Story Text */}
        <motion.div
          className="p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xl md:text-2xl leading-relaxed text-foreground text-center font-medium">
            {act.text}
          </p>
        </motion.div>

        {/* Choices or Next Button */}
        <div className="p-8 pt-4">
          {act.isEnding ? (
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="gradient-aurora p-6 rounded-2xl mb-4">
                <h3 className="text-3xl font-bold text-accent-foreground mb-2">
                  🎉 The End! 🎉
                </h3>
                <p className="text-lg text-accent-foreground">
                  What a magical adventure!
                </p>
              </div>
              {onNext && (
                <Button
                  variant="cosmic"
                  size="lg"
                  onClick={onNext}
                  className="text-xl px-8 py-6"
                >
                  Start New Adventure
                </Button>
              )}
            </motion.div>
          ) : act.choices && act.choices.length > 0 ? (
            <div className="space-y-4">
              <p className="text-center text-lg font-semibold text-muted-foreground mb-4">
                What should happen next?
              </p>
              {act.choices.map((choice, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Button
                    variant="choice"
                    size="lg"
                    onClick={() => onChoice(choice)}
                    className="w-full text-lg py-6 hover:animate-bounce"
                  >
                    ✨ {choice.text}
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              {onNext && (
                <Button
                  variant="aurora"
                  size="lg"
                  onClick={onNext}
                  className="text-xl px-8 py-6"
                >
                  Continue Adventure →
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
