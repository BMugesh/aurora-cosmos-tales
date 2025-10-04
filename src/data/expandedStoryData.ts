import { Act, GameState } from "@/types/storyTypes";

export const expandedStoryActs: Act[] = [
  // Act 1: The Storm
  {
    id: 1,
    title: "The Storm Awakens",
    text: (state) => state.currentPerspective === "aurora" 
      ? "Aurora danced through the twilight sky, her ribbons painting magical colors. Suddenly, a strange signal pierced through the darkness - a plane was in trouble!"
      : "Captain Zoom gripped the controls as lightning cracked around the plane. The instruments went haywire. WHOOSH! A magical aurora appeared, and everything went topsy-turvy!",
    characterEmotion: "excited",
    pilotEmotion: "worried",
    choices: [
      {
        text: "Follow the distress signal immediately",
        nextAct: 2,
        reaction: "determined",
        stateUpdate: { signalFollowed: true }
      },
      {
        text: "Stay at the crash site and investigate",
        nextAct: 3,
        reaction: "worried",
        stateUpdate: { signalFollowed: false }
      }
    ]
  },

  // Act 2: Quick Response (if signal followed)
  {
    id: 2,
    title: "Racing Through the Stars",
    text: (state) => state.currentPerspective === "aurora"
      ? "Aurora zoomed through the starry void, her ribbons leaving trails of shimmering light. There! A fluffy cloud with someone on it!"
      : "The pilot tumbled through clouds softer than marshmallows. Suddenly, a glowing figure appeared - Aurora, the spirit of the northern lights!",
    characterEmotion: "excited",
    pilotEmotion: "surprised",
    conditionCheck: (state) => state.signalFollowed === true,
    choices: [
      {
        text: "Aurora offers to share her magical ribbons",
        nextAct: 5,
        reaction: "happy",
        stateUpdate: { ribbonsShared: true }
      },
      {
        text: "Pilot asks to find the plane first",
        nextAct: 6,
        reaction: "excited",
        stateUpdate: { planeRepaired: false }
      }
    ]
  },

  // Act 3: Delayed Discovery (if stayed at crash site)
  {
    id: 3,
    title: "The Echo Returns",
    text: "The pilot shouted 'HELLO!' into the sky. Instead of silence, a thousand tiny cloud creatures popped out! They bounced around giggling, then whispered: 'The stranger approaches...'",
    characterEmotion: "neutral",
    pilotEmotion: "surprised",
    conditionCheck: (state) => state.signalFollowed === false,
    choices: [
      {
        text: "Wait for the mysterious stranger",
        nextAct: 4,
        reaction: "worried"
      },
      {
        text: "Follow the cloud creatures to Aurora",
        nextAct: 2,
        reaction: "excited",
        stateUpdate: { signalFollowed: true }
      }
    ]
  },

  // Act 4: The Stranger Appears
  {
    id: 4,
    title: "The Mysterious Stranger",
    text: "A cloaked figure emerged from the mist, riding on a comet. 'Lost, are we?' the stranger chuckled. 'I know these skies... for a price.'",
    characterEmotion: "worried",
    pilotEmotion: "worried",
    choices: [
      {
        text: "Trust the stranger and accept help",
        nextAct: 7,
        reaction: "worried",
        stateUpdate: { strangerTrusted: true }
      },
      {
        text: "Politely refuse and search alone",
        nextAct: 8,
        reaction: "determined",
        stateUpdate: { strangerTrusted: false }
      }
    ]
  },

  // Act 5: Ribbon Magic
  {
    id: 5,
    title: "The Ribbon Dance",
    text: (state) => state.currentPerspective === "aurora"
      ? "Aurora twirled her ribbons around the pilot. 'These are made of stardust and dreams! They'll help you see what you wish for!'"
      : "The pilot held the glowing ribbons - they felt warm and tingly! Suddenly, visions appeared showing the plane's location!",
    characterEmotion: "happy",
    pilotEmotion: "excited",
    conditionCheck: (state) => state.ribbonsShared === true,
    choices: [
      {
        text: "Use ribbons to locate the plane",
        nextAct: 9,
        reaction: "excited"
      },
      {
        text: "First, learn to control the ribbon magic",
        nextAct: 10,
        reaction: "happy",
        stateUpdate: { auroraHelped: true }
      }
    ]
  },

  // Act 6: Plane Search
  {
    id: 6,
    title: "The Great Sky Search",
    text: "Aurora and the pilot zoomed through clouds on a rainbow slide! 'Your plane is playing with the stars!' Aurora giggled. They could see it doing loop-de-loops in the distance!",
    characterEmotion: "excited",
    pilotEmotion: "happy",
    choices: [
      {
        text: "Race to catch the playful plane",
        nextAct: 9,
        reaction: "excited"
      },
      {
        text: "Try to repair it mid-flight",
        nextAct: 11,
        reaction: "determined",
        stateUpdate: { planeRepaired: true }
      }
    ]
  },

  // Act 7: Stranger's Help (leads to betrayal)
  {
    id: 7,
    title: "A Deal in the Stars",
    text: "The stranger led them through a secret sky route. 'This way is faster... but remember, you owe me.' The path glittered suspiciously.",
    characterEmotion: "worried",
    pilotEmotion: "worried",
    conditionCheck: (state) => state.strangerTrusted === true,
    choices: [
      {
        text: "Continue following the stranger",
        nextAct: 12,
        reaction: "worried"
      },
      {
        text: "Aurora senses danger - turn back!",
        nextAct: 8,
        reaction: "scared",
        stateUpdate: { strangerTrusted: false }
      }
    ]
  },

  // Act 8: Going Solo
  {
    id: 8,
    title: "The Solo Journey",
    text: (state) => state.currentPerspective === "aurora"
      ? "Aurora spread her ribbons wide, creating a map of light. 'We don't need anyone else! Together we're stronger!'"
      : "The pilot smiled at Aurora. 'Let's do this our way!' They high-fived, sending sparkles everywhere!",
    characterEmotion: "confident",
    pilotEmotion: "confident",
    choices: [
      {
        text: "Search the northern sky region",
        nextAct: 9,
        reaction: "determined"
      },
      {
        text: "Build a signal beacon together",
        nextAct: 13,
        reaction: "excited",
        stateUpdate: { auroraHelped: true }
      }
    ]
  },

  // Act 9: Finding the Plane
  {
    id: 9,
    title: "The Plane's Adventure",
    text: "ZOOM! There it was - the plane doing barrel rolls with shooting stars! It honked happily when it saw them. 'You silly plane!' the pilot laughed.",
    characterEmotion: "excited",
    pilotEmotion: "happy",
    choices: [
      {
        text: "Try to land and check the plane",
        nextAct: (state) => state.planeRepaired ? 14 : 15,
        reaction: "excited"
      },
      {
        text: "Join the plane's fun first!",
        nextAct: 16,
        reaction: "funny"
      }
    ]
  },

  // Act 10: Mastering Magic
  {
    id: 10,
    title: "Aurora's Lesson",
    text: "Aurora taught the pilot to weave light patterns with the ribbons. 'Think of what you love most!' Suddenly, images of home appeared, creating a magical compass!",
    characterEmotion: "happy",
    pilotEmotion: "excited",
    conditionCheck: (state) => state.auroraHelped === true,
    choices: [
      {
        text: "Follow the compass home",
        nextAct: 14,
        reaction: "happy"
      },
      {
        text: "First find the plane",
        nextAct: 9,
        reaction: "determined"
      }
    ]
  },

  // Act 11: Mid-Flight Repairs
  {
    id: 11,
    title: "The Sky Mechanic",
    text: "The pilot grabbed tools made of starlight! Aurora held the plane steady with her ribbons while repairs were made. 'We make a great team!' they shouted!",
    characterEmotion: "excited",
    pilotEmotion: "confident",
    choices: [
      {
        text: "Test the repaired plane",
        nextAct: 14,
        reaction: "excited",
        stateUpdate: { planeRepaired: true }
      },
      {
        text: "Add Aurora's magic to the engine!",
        nextAct: 17,
        reaction: "happy",
        stateUpdate: { planeRepaired: true, auroraHelped: true }
      }
    ]
  },

  // Act 12: The Betrayal
  {
    id: 12,
    title: "The Stranger's True Colors",
    text: "The stranger's cloak fell away - it was a mischievous Sky Trickster! 'Thanks for the fun! Your plane is MINE now!' The trickster cackled and flew away!",
    characterEmotion: "angry",
    pilotEmotion: "angry",
    conditionCheck: (state) => state.strangerTrusted === true,
    choices: [
      {
        text: "Chase the trickster!",
        nextAct: 18,
        reaction: "determined"
      },
      {
        text: "Let it go, create a new plan",
        nextAct: 19,
        reaction: "sad"
      }
    ]
  },

  // Act 13: The Beacon
  {
    id: 13,
    title: "Light in the Darkness",
    text: "Together they built a beacon of rainbow light so bright it could be seen across all realms! The plane saw it and flew straight to them!",
    characterEmotion: "excited",
    pilotEmotion: "happy",
    conditionCheck: (state) => state.auroraHelped === true,
    choices: [
      {
        text: "Prepare for the journey home",
        nextAct: 14,
        reaction: "happy"
      }
    ]
  },

  // Act 14: Unity Ending
  {
    id: 14,
    title: "Home Together",
    text: (state) => {
      const extras = [];
      if (state.planeRepaired) extras.push("The repaired plane hummed perfectly.");
      if (state.ribbonsShared) extras.push("Aurora's ribbons glowed with friendship.");
      if (state.auroraHelped) extras.push("Their magical bond would last forever.");
      
      return `Aurora wrapped her ribbons around the plane and pilot. 'You can always visit!' With a gentle push, they slid down a rainbow bridge. ${extras.join(" ")} The pilot waved goodbye as Aurora's laughter echoed through the stars. They'd found a magical friend forever!`;
    },
    characterEmotion: "happy",
    pilotEmotion: "happy",
    isEnding: true,
    endingType: "unity"
  },

  // Act 15: Risky Landing
  {
    id: 15,
    title: "The Bumpy Ride",
    text: "Without repairs, the plane sputtered and shook! Aurora quickly wrapped her ribbons around it. 'Hold on tight!' They crash-landed on a soft cloud!",
    characterEmotion: "worried",
    pilotEmotion: "scared",
    conditionCheck: (state) => state.planeRepaired === false,
    choices: [
      {
        text: "Aurora sacrifices her ribbons to repair it",
        nextAct: 20,
        reaction: "sad"
      },
      {
        text: "Find another way home together",
        nextAct: 14,
        reaction: "determined"
      }
    ]
  },

  // Act 16: The Silly Adventure
  {
    id: 16,
    title: "Loop-de-Loop Party!",
    text: "They joined the plane in the wildest sky dance ever! Aurora made her ribbons into party streamers, the pilot did silly faces through the window, and the plane honked a funny tune! Even the stars were laughing!",
    characterEmotion: "funny",
    pilotEmotion: "funny",
    choices: [
      {
        text: "End with a funny farewell",
        nextAct: 21,
        reaction: "funny"
      },
      {
        text: "Get serious and go home",
        nextAct: 14,
        reaction: "happy"
      }
    ]
  },

  // Act 17: Super-Powered Plane
  {
    id: 17,
    title: "The Magic Engine",
    text: "Aurora channeled her light magic into the plane's engine! It sparkled and glowed! 'Now your plane can fly through rainbows!' Aurora cheered. The plane did a happy loop!",
    characterEmotion: "excited",
    pilotEmotion: "excited",
    conditionCheck: (state) => state.planeRepaired && state.auroraHelped,
    choices: [
      {
        text: "Fly home in style!",
        nextAct: 14,
        reaction: "excited"
      }
    ]
  },

  // Act 18: The Chase
  {
    id: 18,
    title: "The Great Sky Chase",
    text: "Aurora and the pilot chased the trickster across meteor showers and through nebula clouds! Finally, they cornered the trickster. 'Okay, okay! You win!' the trickster laughed, returning the plane.",
    characterEmotion: "confident",
    pilotEmotion: "confident",
    choices: [
      {
        text: "Forgive the trickster and go home",
        nextAct: 14,
        reaction: "happy"
      },
      {
        text: "Make the trickster help as punishment",
        nextAct: 22,
        reaction: "funny"
      }
    ]
  },

  // Act 19: New Beginning
  {
    id: 19,
    title: "The Lost Becomes Found",
    text: "Sometimes losing leads to finding something better. Without the plane, Aurora taught the pilot to ride on ribbons of light. They became the best sky-surfing team ever!",
    characterEmotion: "happy",
    pilotEmotion: "happy",
    isEnding: true,
    endingType: "isolation",
    choices: [
      {
        text: "Start a new adventure together",
        nextAct: 1,
        reaction: "excited"
      }
    ]
  },

  // Act 20: Sacrifice Ending
  {
    id: 20,
    title: "The Greatest Gift",
    text: "Aurora poured all her magic into the plane, her ribbons fading to fix it. 'I'll be okay,' she whispered, growing dim. 'Go home and remember me when you see the northern lights.' The pilot flew home with tears of gratitude, and every aurora reminded them of their magical friend.",
    characterEmotion: "sad",
    pilotEmotion: "sad",
    isEnding: true,
    endingType: "sacrifice"
  },

  // Act 21: Funny Ending
  {
    id: 21,
    title: "The Silliest Goodbye Ever!",
    text: "Aurora made her ribbons into a giant rubber band and BOING! Launched the plane home like a slingshot! The pilot stuck out their tongue, Aurora crossed her eyes, and they both made the goofiest faces ever! 'Visit again soon, silly human!' Aurora laughed. The plane honked all the way home!",
    characterEmotion: "funny",
    pilotEmotion: "funny",
    isEnding: true,
    endingType: "funny"
  },

  // Act 22: Redemption Path
  {
    id: 22,
    title: "The Trickster's Redemption",
    text: "The trickster became their guide, showing them secret sky routes and teaching them sky magic tricks! 'I was just lonely,' the trickster admitted. They all became best friends and had many more adventures!",
    characterEmotion: "happy",
    pilotEmotion: "happy",
    isEnding: true,
    endingType: "unity"
  }
];
