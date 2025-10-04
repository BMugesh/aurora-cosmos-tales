import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ComicPanelProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const ComicPanel = ({ children, delay = 0, className = "" }: ComicPanelProps) => {
  return (
    <motion.div
      className={`comic-panel ${className}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.68, -0.55, 0.265, 1.55]
      }}
    >
      {children}
    </motion.div>
  );
};
