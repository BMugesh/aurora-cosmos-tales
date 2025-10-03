export interface Choice {
  text: string;
  nextAct: number;
  reaction: "happy" | "sad" | "funny" | "excited" | "worried";
}

export interface Act {
  id: number;
  title: string;
  text: string;
  characterEmotion: "happy" | "sad" | "excited" | "neutral" | "surprised";
  pilotEmotion: "happy" | "sad" | "excited" | "neutral" | "surprised" | "worried";
  choices?: Choice[];
  isEnding?: boolean;
}

export const storyActs: Act[] = [
  {
    id: 1,
    title: "The Lost Pilot",
    text: "High above the clouds, a brave pilot named Captain Zoom was flying through a storm when suddenly, WHOOSH! A magical aurora appeared and whisked the plane into the sky realm! The pilot tumbled out and landed softly on a fluffy cloud.",
    characterEmotion: "excited",
    pilotEmotion: "surprised",
    choices: [
      {
        text: "Look around and explore the cloud",
        nextAct: 2,
        reaction: "happy"
      },
      {
        text: "Call for help immediately",
        nextAct: 3,
        reaction: "worried"
      }
    ]
  },
  {
    id: 2,
    title: "Meeting Aurora",
    text: "As the pilot explored the bouncy clouds, a beautiful, glowing figure appeared - it was Aurora, the spirit of the northern lights! 'Hello, little human!' she giggled, her ribbons swirling with colors. 'Welcome to my sky kingdom!'",
    characterEmotion: "happy",
    pilotEmotion: "excited",
    choices: [
      {
        text: "Ask Aurora for help finding the plane",
        nextAct: 4,
        reaction: "happy"
      },
      {
        text: "Ask to play with the ribbons first",
        nextAct: 5,
        reaction: "funny"
      }
    ]
  },
  {
    id: 3,
    title: "The Echo Returns",
    text: "The pilot shouted 'HELLO!' into the sky. Instead of silence, a thousand tiny cloud creatures popped out, all shouting 'HELLO!' back! They bounced around like popcorn, making the pilot laugh. One little cloud whispered, 'Follow us to Aurora!'",
    characterEmotion: "neutral",
    pilotEmotion: "happy",
    choices: [
      {
        text: "Follow the cloud creatures",
        nextAct: 2,
        reaction: "excited"
      }
    ]
  },
  {
    id: 4,
    title: "The Great Search",
    text: "Aurora twirled her magical ribbons and smiled. 'Your plane is playing hide and seek with my star friends! Let's find it together!' She summoned a rainbow slide that zoomed through the clouds, and they slid down, laughing all the way!",
    characterEmotion: "excited",
    pilotEmotion: "excited",
    choices: [
      {
        text: "Slide down quickly",
        nextAct: 6,
        reaction: "excited"
      },
      {
        text: "Ask Aurora about her ribbons",
        nextAct: 7,
        reaction: "happy"
      }
    ]
  },
  {
    id: 5,
    title: "Ribbon Dance",
    text: "Aurora giggled and let the pilot hold her glowing ribbons. They danced through the air, painting the sky with swirls of green, blue, and purple! 'This is wonderful!' the pilot laughed. Aurora winked, 'Now, let's find your plane - it's having too much fun without us!'",
    characterEmotion: "happy",
    pilotEmotion: "happy",
    choices: [
      {
        text: "Start the search",
        nextAct: 6,
        reaction: "excited"
      }
    ]
  },
  {
    id: 6,
    title: "The Plane's Adventure",
    text: "ZOOM! They found the plane doing loop-de-loops with a group of shooting stars! The plane was having the time of its life, doing barrel rolls and figure-eights. It honked happily when it saw the pilot. 'You silly plane!' the pilot laughed.",
    characterEmotion: "excited",
    pilotEmotion: "happy",
    choices: [
      {
        text: "Join the plane's fun for a bit",
        nextAct: 8,
        reaction: "excited"
      },
      {
        text: "Ask Aurora to help get home now",
        nextAct: 8,
        reaction: "happy"
      }
    ]
  },
  {
    id: 7,
    title: "Aurora's Magic",
    text: "Aurora explained that her ribbons were made of stardust and dreams! 'They can show you anything you wish for,' she said, waving them gracefully. The ribbons showed the pilot the location of the plane - it was racing with comets! 'Let's catch it!' Aurora cheered.",
    characterEmotion: "excited",
    pilotEmotion: "surprised",
    choices: [
      {
        text: "Race to catch the plane",
        nextAct: 6,
        reaction: "excited"
      }
    ]
  },
  {
    id: 8,
    title: "Journey Home",
    text: "Aurora swirled her magical ribbons around the plane and pilot. 'Time to go home, but remember - you can always visit!' With a gentle push, she sent them sliding down a rainbow bridge. The pilot waved goodbye as Aurora's laughter echoed through the stars. The plane landed safely, and the pilot knew they'd found a magical friend forever!",
    characterEmotion: "happy",
    pilotEmotion: "happy",
    isEnding: true
  }
];
