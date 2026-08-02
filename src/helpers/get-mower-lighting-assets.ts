import type { NovaMowerModel } from "../types/mower-model";

export interface MowerLightingAssets {
  front: string | null;
  side: string | null;
}

const HACS_BASE_PATH =
  "/hacsfiles/nova-luba-card/images";

export function getMowerLightingAssets(
  model: NovaMowerModel,
): MowerLightingAssets {
  switch (model) {
    case "luba3":
      return {
        front:
          `${HACS_BASE_PATH}/luba3/lighting/front-light.png`,
        side:
          `${HACS_BASE_PATH}/luba3/lighting/side-light.png`,
      };

    default:
      return {
        front: null,
        side: null,
      };
  }
}