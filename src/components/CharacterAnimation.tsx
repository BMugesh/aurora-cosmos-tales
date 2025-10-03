import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import auroraImg from "@/assets/aurora-character.png";
import pilotImg from "@/assets/pilot-character.png";
import planeImg from "@/assets/plane.png";

interface CharacterAnimationProps {
  character: "aurora" | "pilot" | "plane";
  emotion: "happy" | "sad" | "excited" | "neutral" | "surprised" | "worried";
  actId: number;
  className?: string;
}

export const CharacterAnimation = ({ character, emotion, actId, className = "" }: CharacterAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  const images = {
    aurora: auroraImg,
    pilot: pilotImg,
    plane: planeImg,
  };

  // Act-specific animations using GSAP
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const img = element.querySelector("img");
    
    // Clear previous animations
    gsap.killTweensOf(element);
    gsap.killTweensOf(img);

    // Aurora act-specific animations
    if (character === "aurora") {
      switch (actId) {
        case 1: // First appearance - magical entrance
          gsap.fromTo(element, 
            { scale: 0, rotation: -180, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
          );
          gsap.to(img, {
            filter: "drop-shadow(0 0 30px hsl(280, 90%, 65%)) brightness(1.2)",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
          break;
        
        case 2: // Meeting - gentle swaying
          gsap.to(element, {
            y: -15,
            rotation: 5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
          break;
        
        case 4: // Great Search - spinning ribbons effect
        case 7: // Aurora's Magic
          gsap.to(element, {
            rotation: 360,
            duration: 4,
            repeat: -1,
            ease: "none"
          });
          gsap.to(img, {
            scale: 1.1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
          break;
        
        case 5: // Ribbon Dance - flowing movement
          gsap.to(element, {
            keyframes: [
              { x: 0, y: 0, rotation: 0 },
              { x: 20, y: -20, rotation: 15 },
              { x: -20, y: -10, rotation: -15 },
              { x: 0, y: 0, rotation: 0 }
            ],
            duration: 3,
            repeat: -1,
            ease: "sine.inOut"
          });
          break;
        
        case 8: // Goodbye - waving motion
          gsap.to(element, {
            keyframes: [
              { rotation: 0 },
              { rotation: 20 },
              { rotation: -20 },
              { rotation: 0 }
            ],
            duration: 1.5,
            repeat: -1,
            ease: "power1.inOut"
          });
          break;
        
        default:
          gsap.to(element, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
      }
    }

    // Pilot act-specific animations
    if (character === "pilot") {
      switch (actId) {
        case 1: // Lost - tumbling motion
          gsap.fromTo(element,
            { y: -100, rotation: -45, opacity: 0 },
            { y: 0, rotation: 0, opacity: 1, duration: 1.5, ease: "bounce.out" }
          );
          gsap.to(element, {
            keyframes: [
              { x: -3 },
              { x: 3 },
              { x: -3 }
            ],
            duration: 0.3,
            repeat: 3,
            delay: 1.5,
            ease: "power1.inOut"
          });
          break;
        
        case 3: // Calling for help - waving arms
          gsap.to(element, {
            keyframes: [
              { rotation: 0, y: -5 },
              { rotation: -15, y: -10 },
              { rotation: 15, y: -5 },
              { rotation: 0, y: -5 }
            ],
            duration: 0.8,
            repeat: -1,
            ease: "power1.inOut"
          });
          break;
        
        case 6: // Found plane - jumping for joy
          gsap.to(element, {
            keyframes: [
              { y: -30 },
              { y: 0 }
            ],
            duration: 0.6,
            repeat: -1,
            ease: "power2.out",
            repeatDelay: 0.3
          });
          break;
        
        case 8: // Going home - happy wave
          gsap.to(element, {
            keyframes: [
              { rotation: 0, scale: 1 },
              { rotation: 10, scale: 1.05 },
              { rotation: 0, scale: 1 }
            ],
            duration: 1.2,
            repeat: -1,
            ease: "sine.inOut"
          });
          break;
        
        default:
          gsap.to(element, {
            y: -8,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
      }
    }

    // Plane act-specific animations
    if (character === "plane") {
      switch (actId) {
        case 1: // Flying through storm - turbulent
          gsap.to(element, {
            keyframes: [
              { x: 0, y: 0, rotation: -10 },
              { x: 15, y: -10, rotation: 10 },
              { x: -15, y: 10, rotation: -10 },
              { x: 0, y: 0, rotation: -10 }
            ],
            duration: 0.8,
            repeat: -1,
            ease: "power1.inOut"
          });
          break;
        
        case 6: // Loop-de-loops - acrobatic
          gsap.to(element, {
            rotation: 360,
            duration: 2,
            repeat: -1,
            ease: "none"
          });
          gsap.to(element, {
            keyframes: [
              { scale: 1 },
              { scale: 1.2 },
              { scale: 1 }
            ],
            duration: 2,
            repeat: -1,
            ease: "sine.inOut"
          });
          break;
        
        case 7: // Racing with comets - zooming
          gsap.to(element, {
            keyframes: [
              { x: 0, rotation: 0 },
              { x: 50, rotation: -15 },
              { x: 0, rotation: 0 }
            ],
            duration: 1.5,
            repeat: -1,
            ease: "power2.inOut"
          });
          break;
        
        case 8: // Landing - gentle descent
          gsap.to(element, {
            keyframes: [
              { y: 0, rotation: -5 },
              { y: 10, rotation: 5 },
              { y: 0, rotation: -5 }
            ],
            duration: 2,
            repeat: -1,
            ease: "sine.inOut"
          });
          break;
        
        default:
          gsap.to(element, {
            keyframes: [
              { rotation: -5, x: 0 },
              { rotation: 5, x: 10 },
              { rotation: -5, x: 0 }
            ],
            duration: 2.5,
            repeat: -1,
            ease: "sine.inOut"
          });
      }
    }

    return () => {
      gsap.killTweensOf(element);
      gsap.killTweensOf(img);
    };
  }, [character, actId]);

  // Emotion-based particle effects
  useEffect(() => {
    if (!sparklesRef.current) return;

    const container = sparklesRef.current;
    
    if (emotion === "excited" || emotion === "happy") {
      const interval = setInterval(() => {
        const sparkle = document.createElement("div");
        sparkle.className = "absolute w-2 h-2 bg-accent rounded-full";
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        container.appendChild(sparkle);

        gsap.to(sparkle, {
          keyframes: [
            { scale: 0, opacity: 0, y: 0 },
            { scale: 1, opacity: 1, y: -25 },
            { scale: 0, opacity: 0, y: -50 }
          ],
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => sparkle.remove()
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [emotion]);

  const glowColors = {
    aurora: "drop-shadow(0 0 30px hsl(280, 90%, 65%)) drop-shadow(0 0 50px hsl(195, 92%, 62%))",
    pilot: "drop-shadow(0 5px 20px rgba(0,0,0,0.4))",
    plane: "drop-shadow(0 5px 15px rgba(0,0,0,0.3))"
  };

  return (
    <div className={`relative ${className}`}>
      <div ref={elementRef} className="relative w-full h-full">
        <img 
          src={images[character]} 
          alt={character}
          className="w-full h-full object-contain"
          style={{ 
            filter: glowColors[character],
            willChange: "transform, filter"
          }}
        />
      </div>
      
      {/* Sparkle container */}
      <div ref={sparklesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Additional visual effects based on character and act */}
      {character === "aurora" && (actId === 4 || actId === 5 || actId === 7) && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(280, 90%, 65%, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Trail effect for plane when racing */}
      {character === "plane" && actId === 6 && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 right-full w-16 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"
              animate={{
                opacity: [0, 0.6, 0],
                x: [-20, 40],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};
