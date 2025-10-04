import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

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

    // Initialize stars with parallax layers
    const starCount = 300;
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 0.5,
      speed: Math.random() * 1.5 + 0.2,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 50,
        y: (e.clientY / window.innerHeight - 0.5) * 50,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      // Clear with dark gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "hsl(245, 100%, 6%)");
      gradient.addColorStop(1, "hsl(280, 60%, 10%)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with parallax
      starsRef.current.forEach((star, index) => {
        // Parallax based on mouse position
        const parallaxFactor = (star.size / 3) * 0.5;
        const offsetX = mouseRef.current.x * parallaxFactor;
        const offsetY = mouseRef.current.y * parallaxFactor;

        // Twinkling effect
        star.opacity += (Math.random() - 0.5) * 0.05;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));

        // Draw star with glow
        const x = star.x + offsetX;
        const y = star.y + offsetY;
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3);
        glowGradient.addColorStop(0, `rgba(${index % 3 === 0 ? '168, 85, 247' : index % 3 === 1 ? '59, 130, 246' : '16, 185, 129'}, ${star.opacity * 0.3})`);
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(x - star.size * 3, y - star.size * 3, star.size * 6, star.size * 6);

        // Star core
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Move star
        star.y += star.speed;
        if (star.y > canvas.height + 50) {
          star.y = -50;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw cosmic particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;
        
        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace('1)', `${p.life})`);
          ctx.fill();
          return true;
        }
        return false;
      });

      // Randomly add particles
      if (Math.random() < 0.05) {
        const colors = [
          'rgba(168, 85, 247, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)'
        ];
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Aurora ribbons with neon glow */}
      <motion.div
        className="absolute top-0 left-0 w-full h-96 opacity-40"
        style={{
          background: "linear-gradient(180deg, hsl(158, 100%, 60%) 0%, hsl(195, 100%, 65%) 50%, hsl(280, 100%, 70%) 100%)",
          filter: "blur(80px)",
          mixBlendMode: "screen",
        }}
        animate={{
          x: [0, 150, 0],
          y: [0, 80, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(320, 100%, 70%) 0%, hsl(280, 100%, 70%) 40%, transparent 70%)",
          filter: "blur(60px)",
          mixBlendMode: "screen",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Additional cosmic glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(195, 100%, 65%) 0%, transparent 60%)",
          filter: "blur(100px)",
          mixBlendMode: "screen",
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
