export type MowerLightingAnimation =
  | "none"
  | "pulse"
  | "blink"
  | "breathe";

export interface MowerLightLayer {
  visible: boolean;
  color: string;
  brightness: number;
  animation: MowerLightingAnimation;
  asset?: string | null;
}

export interface MowerLighting {
  ring: MowerLightLayer;
  front: MowerLightLayer;
  side: MowerLightLayer;
}