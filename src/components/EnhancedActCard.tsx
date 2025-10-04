import { motion } from "framer-motion";
import { CharacterAnimation } from "./CharacterAnimation";
import { Act, Choice, GameState } from "@/types/storyTypes";
import { Sparkles, Zap } from "lucide-react";
import { ComicPanel } from "./ComicPanel";
import { NeonButton } from "./NeonButton";

interface EnhancedActCardProps {
  act: Act;
  gameState: GameState;
  onChoice: (choice: Choice, index: number) => void;
  onNext?: () => void;
}

export const EnhancedActCard = ({ act, gameState, onChoice, onNext }: EnhancedActCardProps) => {

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
    <ComicPanel className="max-w-6xl mx-auto p-6 md:p-10" delay={0.2}>
      <div className="relative">
        {/* Comic-style Title Banner */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-2xl" />
          <div className="relative bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border-4 border-primary/50 rounded-3xl p-4 md:p-6 backdrop-blur-sm">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bubble text-center text-gradient flex items-center justify-center gap-3 flex-wrap neon-text">
              <Zap className="w-8 h-8 md:w-12 md:h-12 text-primary animate-pulse-glow" />
              {act.title}
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-accent animate-pulse-glow" />
            </h2>
          </div>
        </motion.div>

        {/* Characters Stage */}
        <motion.div 
          className="relative mb-8 p-6 md:p-8 rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1), hsl(var(--accent) / 0.1))",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Spotlight effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative flex justify-around items-end min-h-[280px] md:min-h-[400px]">
            <motion.div
              className="flex flex-col items-center"
              initial={{ x: -120, opacity: 0, rotate: -15 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
            >
              <CharacterAnimation
                character="aurora"
                emotion={act.characterEmotion}
                actId={act.id}
                className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
              />
              <motion.div
                className="mt-3 px-4 py-2 bg-primary/30 backdrop-blur-sm border-2 border-primary rounded-full"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px hsl(var(--primary))" }}
              >
                <p className="text-center font-bubble text-lg md:text-xl text-primary neon-text">Aurora</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              initial={{ x: 120, opacity: 0, rotate: 15 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
            >
              <CharacterAnimation
                character="pilot"
                emotion={act.pilotEmotion}
                actId={act.id}
                className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
              />
              <motion.div
                className="mt-3 px-4 py-2 bg-secondary/30 backdrop-blur-sm border-2 border-secondary rounded-full"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px hsl(var(--secondary))" }}
              >
                <p className="text-center font-bubble text-lg md:text-xl text-secondary neon-text">Pilot</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", bounce: 0.6 }}
            >
              <CharacterAnimation
                character="plane"
                emotion="neutral"
                actId={act.id}
                className="w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48"
              />
              <motion.div
                className="mt-3 px-4 py-2 bg-accent/30 backdrop-blur-sm border-2 border-accent rounded-full"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px hsl(var(--accent))" }}
              >
                <p className="text-center font-bubble text-lg md:text-xl text-accent neon-text">Plane</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Story Text - Comic Speech Bubble Style */}
        <motion.div
          className="relative my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="relative">
            {/* Speech bubble tail */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-primary/50" />
            
            <div className="bg-gradient-to-br from-card via-card to-card/80 p-6 md:p-10 rounded-3xl border-4 border-primary/40 shadow-[0_0_30px_hsl(var(--primary)/0.3)] backdrop-blur-sm">
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/50 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-secondary/50 animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="w-3 h-3 rounded-full bg-accent/50 animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
              
              <p className="text-xl md:text-3xl lg:text-4xl leading-relaxed text-foreground text-center font-sans font-medium">
                {getText()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Choices or Ending */}
        <div className="flex flex-col items-center gap-6 mt-8">
          {act.isEnding ? (
            <motion.div
              className="text-center w-full"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: "spring", bounce: 0.6 }}
            >
              <div className="relative p-10 md:p-12 rounded-3xl mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90 animate-pulse" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                
                <div className="relative z-10">
                  <motion.h3 
                    className="text-6xl md:text-7xl font-bubble mb-4"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    {getEndingMessage().emoji}
                  </motion.h3>
                  <h3 className="text-4xl md:text-5xl font-bubble text-base-100 mb-4 neon-text">
                    {getEndingMessage().text}
                  </h3>
                  <p className="text-2xl md:text-3xl text-base-100 font-sans font-semibold">
                    What a magical adventure!
                  </p>
                </div>
              </div>
              
              {onNext && (
                <NeonButton onClick={onNext} variant="primary" delay={1.2}>
                  <Sparkles className="w-6 h-6 mr-2" />
                  Start New Adventure
                  <Sparkles className="w-6 h-6 ml-2" />
                </NeonButton>
              )}
            </motion.div>
          ) : act.choices && act.choices.length > 0 ? (
            <div className="space-y-5 w-full">
              <motion.p 
                className="text-center text-2xl md:text-3xl font-bubble text-gradient mb-6 neon-text"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
              >
                <Zap className="inline w-8 h-8 mr-2" />
                What happens next?
                <Zap className="inline w-8 h-8 ml-2" />
              </motion.p>
              
              {act.choices
                .filter(choice => !choice.perspectiveSpecific || choice.perspectiveSpecific === gameState.currentPerspective)
                .map((choice, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: index % 2 === 0 ? -80 : 80, opacity: 0, rotate: index % 2 === 0 ? -5 : 5 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    transition={{ 
                      delay: 1 + index * 0.15, 
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }}
                  >
                    <NeonButton
                      onClick={() => onChoice(choice, index)}
                      variant={index % 3 === 0 ? "primary" : index % 3 === 1 ? "secondary" : "accent"}
                      className="w-full py-6 md:py-8 text-xl md:text-2xl"
                      delay={0}
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      {choice.text}
                    </NeonButton>
                  </motion.div>
                ))}
            </div>
          ) : onNext ? (
            <NeonButton onClick={onNext} variant="secondary" delay={1}>
              Continue Adventure →
            </NeonButton>
          ) : null}
        </div>
      </div>
    </ComicPanel>
  );
};
