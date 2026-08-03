export interface MowerPresentation {
  desktop: {
    scale: number;
    translateX: number;
    translateY: number;
    maxWidth: number;
    maxHeight: number;
  };
  mobile: {
    scale: number;
    translateX: number;
    translateY: number;
    maxWidth: number;
    maxHeight: number;
  };
}

const defaultPresentation: MowerPresentation = {
  desktop: {
    scale: 1.35,
    translateX: 0,
    translateY: 28,
    maxWidth: 520,
    maxHeight: 330,
  },
  mobile: {
    scale: 1.35,
    translateX: 0,
    translateY: 24,
    maxWidth: 420,
    maxHeight: 285,
  },
};

const presentations: Record<string, MowerPresentation> = {
  luba1: {
    desktop: {
      scale: 1.38,
      translateX: 0,
      translateY: 30,
      maxWidth: 520,
      maxHeight: 330,
    },
    mobile: {
      scale: 1.36,
      translateX: 0,
      translateY: 25,
      maxWidth: 420,
      maxHeight: 285,
    },
  },

  luba2: {
    desktop: {
      scale: 1.4,
      translateX: 4,
      translateY: 30,
      maxWidth: 525,
      maxHeight: 335,
    },
    mobile: {
      scale: 1.38,
      translateX: 2,
      translateY: 25,
      maxWidth: 425,
      maxHeight: 290,
    },
  },

  luba3: {
    desktop: {
      scale: 1.78,
      translateX: 34,
      translateY: 18,
      maxWidth: 610,
      maxHeight: 390,
    },
    mobile: {
      scale: 1.4,
      translateX: 6,
      translateY: 48,
      maxWidth: 430,
      maxHeight: 290,
    },
  },

  mini1: {
    desktop: {
      scale: 1.5,
      translateX: 0,
      translateY: 28,
      maxWidth: 500,
      maxHeight: 325,
    },
    mobile: {
      scale: 1.46,
      translateX: 0,
      translateY: 24,
      maxWidth: 410,
      maxHeight: 280,
    },
  },

  mini2: {
    desktop: {
      scale: 1.48,
      translateX: 0,
      translateY: 28,
      maxWidth: 500,
      maxHeight: 325,
    },
    mobile: {
      scale: 1.44,
      translateX: 0,
      translateY: 24,
      maxWidth: 410,
      maxHeight: 280,
    },
  },
};

export function getMowerPresentation(
  model: string,
): MowerPresentation {
  return presentations[model] ?? defaultPresentation;
}