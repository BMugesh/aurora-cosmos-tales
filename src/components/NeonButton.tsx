import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  delay?: number;
}

export const NeonButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "",
  delay = 0 
}: NeonButtonProps) => {
  const variantStyles = {
    primary: "btn-primary neon-text",
    secondary: "btn-secondary",
    accent: "btn-accent"
  };

  return (
    <motion.button
      onClick={onClick}
      className={`btn btn-lg ${variantStyles[variant]} font-comic text-xl md:text-2xl ${className}`}
      initial={{ opacity: 0, x: variant === "primary" ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 25px hsl(var(--primary) / 0.8)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};
