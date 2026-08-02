import { mowerModels } from "../models/mower-models";

import type { NovaMowerModel } from "../types/mower-model";

const HACS_BASE_PATH =
  "/hacsfiles/nova-luba-card/images";

export function getMowerImage(
  model: NovaMowerModel,
): string {
  const definition = mowerModels[model];

  return [
    HACS_BASE_PATH,
    definition.assetFolder,
    definition.defaultImage,
  ].join("/");
}