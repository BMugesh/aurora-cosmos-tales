import { motion } from "framer-motion";

interface FloatingPlanetProps {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FloatingPlanet = ({ 
  size = 100, 
  color = "hsl(280, 90%, 65%)",
  delay = 0,
  duration = 8,
  className = ""
}: FloatingPlanetProps) => {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
        boxShadow: `0 0 ${size / 2}px ${color}`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
};
