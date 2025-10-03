import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import auroraImg from "@/assets/aurora-character.png";
import pilotImg from "@/assets/pilot-character.png";
import planeImg from "@/assets/plane.png";

interface CharacterAnimationProps {
  character: "aurora" | "pilot" | "plane";
  emotion: "happy" | "sad" | "excited" | "neutral" | "surprised" | "worried";
  className?: string;
}

export const CharacterAnimation = ({ character, emotion, className = "" }: CharacterAnimationProps) => {
  const [rotation, setRotation] = useState(0);

  const images = {
    aurora: auroraImg,
    pilot: pilotImg,
    plane: planeImg,
  };

  const emotionAnimations = {
    happy: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
    },
    sad: {
      y: [0, 5, 0],
      rotate: [0, -2, 0],
      scale: [1, 0.98, 1],
    },
    excited: {
      y: [0, -15, 0],
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
    },
    neutral: {
      y: [0, -5, 0],
      scale: [1, 1.02, 1],
    },
    surprised: {
      scale: [1, 1.15, 1],
      y: [0, -10, 0],
    },
    worried: {
      x: [-2, 2, -2, 2, 0],
      rotate: [-1, 1, -1, 1, 0],
    },
  };

  const characterSpecificAnimation = character === "plane" ? {
    rotate: [-5, 5, -5],
    x: [0, 10, 0],
  } : character === "aurora" ? {
    filter: [
      "drop-shadow(0 0 10px hsl(280, 90%, 65%))",
      "drop-shadow(0 0 20px hsl(195, 92%, 62%))",
      "drop-shadow(0 0 10px hsl(158, 76%, 58%))",
      "drop-shadow(0 0 20px hsl(280, 90%, 65%))",
    ],
  } : {};

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        ...emotionAnimations[emotion],
        ...characterSpecificAnimation,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <img 
        src={images[character]} 
        alt={character}
        className="w-full h-full object-contain"
        style={{ 
          filter: character === "aurora" 
            ? "drop-shadow(0 0 20px hsl(280, 90%, 65%))" 
            : "drop-shadow(0 5px 15px rgba(0,0,0,0.3))"
        }}
      />
      
      {/* Sparkle effects for happy emotion */}
      {emotion === "excited" && (
        <>
          <motion.div
            className="absolute top-0 right-0 w-4 h-4 bg-accent rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />
          <motion.div
            className="absolute top-1/4 left-0 w-3 h-3 bg-primary rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.7,
            }}
          />
        </>
      )}
    </motion.div>
  );
};
