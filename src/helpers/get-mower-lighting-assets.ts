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
    case "luba1":
      return {
        front: null,
        side:
          `${HACS_BASE_PATH}/luba1/lighting/side-light.png`,
      };

    case "luba2":
      return {
        front: null,
        side:
          `${HACS_BASE_PATH}/luba2/lighting/side-light.png`,
      };

    case "luba3":
      return {
        front:
          `${HACS_BASE_PATH}/luba3/lighting/front-light.png`,
        side:
          `${HACS_BASE_PATH}/luba3/lighting/side-light.png`,
      };

    case "mini1":
      return {
        front:
          `${HACS_BASE_PATH}/mini/lighting/mini1-front-light.png`,
        side: null,
      };

    case "mini2":
      return {
        front:
          `${HACS_BASE_PATH}/mini/lighting/mini2-front-light.png`,
        side:
          `${HACS_BASE_PATH}/mini/lighting/mini2-side-light.png`,
      };

    default:
      return {
        front: null,
        side: null,
      };
  }
}