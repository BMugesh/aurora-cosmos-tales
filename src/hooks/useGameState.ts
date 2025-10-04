import { useState, useCallback } from "react";
import { GameState, Character } from "@/types/storyTypes";

const initialGameState: GameState = {
  signalFollowed: false,
  strangerTrusted: false,
  planeRepaired: false,
  auroraHelped: false,
  ribbonsShared: false,
  currentPerspective: "aurora",
  choicesMade: {}
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  const switchPerspective = useCallback((perspective: Character) => {
    setGameState(prev => ({ ...prev, currentPerspective: perspective }));
  }, []);

  const resetGameState = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  const recordChoice = useCallback((actId: number, choiceIndex: number) => {
    setGameState(prev => ({
      ...prev,
      choicesMade: {
        ...prev.choicesMade,
        [actId]: choiceIndex
      }
    }));
  }, []);

  return {
    gameState,
    updateGameState,
    switchPerspective,
    resetGameState,
    recordChoice
  };
};
