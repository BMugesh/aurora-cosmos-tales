export type Emotion = "happy" | "sad" | "excited" | "neutral" | "surprised" | "worried" | "angry" | "scared" | "confident" | "funny";
export type Reaction = "happy" | "sad" | "funny" | "excited" | "worried" | "shocked" | "determined" | "scared";
export type Character = "aurora" | "pilot";

export interface GameState {
  signalFollowed: boolean;
  strangerTrusted: boolean;
  planeRepaired: boolean;
  auroraHelped: boolean;
  ribbonsShared: boolean;
  currentPerspective: Character;
  choicesMade: Record<string, any>;
}

export interface Choice {
  text: string;
  nextAct: number | ((state: GameState) => number);
  reaction: Reaction;
  stateUpdate?: Partial<GameState>;
  perspectiveSpecific?: Character;
}

export interface Act {
  id: number;
  title: string;
  text: string | ((state: GameState) => string);
  characterEmotion: Emotion;
  pilotEmotion: Emotion;
  choices?: Choice[];
  isEnding?: boolean;
  endingType?: "unity" | "betrayal" | "sacrifice" | "isolation" | "funny";
  conditionCheck?: (state: GameState) => boolean;
  onEnter?: (state: GameState) => Partial<GameState>;
}
