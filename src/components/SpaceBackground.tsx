import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize stars
    const starCount = 200;
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.5,
    }));

    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = "rgba(26, 10, 46, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Twinkling effect
        star.opacity += (Math.random() - 0.5) * 0.03;
        star.opacity = Math.max(0.3, Math.min(1, star.opacity));

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Move star
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Aurora ribbons */}
      <motion.div
        className="absolute top-0 left-0 w-full h-96 opacity-30"
        style={{
          background: "linear-gradient(180deg, hsl(158, 76%, 58%) 0%, hsl(195, 92%, 62%) 50%, hsl(280, 90%, 65%) 100%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(280, 90%, 65%) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
