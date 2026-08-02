import type { NovaMowerModel } from "../types/mower-model";

export interface MowerModelDefinition {
  id: NovaMowerModel;
  manufacturer: string;
  displayName: string;
  assetFolder: string;
  defaultImage: string;
}

export const mowerModels: Record<
  NovaMowerModel,
  MowerModelDefinition
> = {
  luba1: {
    id: "luba1",
    manufacturer: "Mammotion",
    displayName: "Luba 1",
    assetFolder: "luba1",
    defaultImage: "default.webp",
  },

  luba2: {
    id: "luba2",
    manufacturer: "Mammotion",
    displayName: "Luba 2",
    assetFolder: "luba2",
    defaultImage: "default.webp",
  },

  luba3: {
    id: "luba3",
    manufacturer: "Mammotion",
    displayName: "Luba 3 AWD LiDAR",
    assetFolder: "luba3",
    defaultImage: "default.webp",
  },

  mini1: {
    id: "mini1",
    manufacturer: "Mammotion",
    displayName: "Luba Mini 1",
    assetFolder: "mini",
    defaultImage: "mini1-default.webp",
  },

  mini2: {
    id: "mini2",
    manufacturer: "Mammotion",
    displayName: "Luba Mini 2",
    assetFolder: "mini",
    defaultImage: "mini2-default.webp",
  },

  unknown: {
    id: "unknown",
    manufacturer: "Mammotion",
    displayName: "Mammotion Mower",
    assetFolder: "assets/robot",
    defaultImage: "fallback.webp",
  },
};