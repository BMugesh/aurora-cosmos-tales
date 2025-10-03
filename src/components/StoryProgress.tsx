import { motion } from "framer-motion";

interface StoryProgressProps {
  currentAct: number;
  totalActs: number;
}

export const StoryProgress = ({ currentAct, totalActs }: StoryProgressProps) => {
  const progress = (currentAct / totalActs) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-border">
          <span className="text-sm font-bold ml-2 text-foreground">
            Act {currentAct} of {totalActs}
          </span>
          
          <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-aurora"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          <div className="flex gap-1 mr-2">
            {Array.from({ length: totalActs }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < currentAct ? "bg-primary" : "bg-muted"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: i < currentAct ? 1 : 0.7 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
