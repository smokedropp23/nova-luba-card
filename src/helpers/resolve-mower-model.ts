import type { NovaMowerModel } from "../types/mower-model";

export function resolveMowerModel(
  configuredModel: string | undefined,
): NovaMowerModel {
  const model = configuredModel
    ?.trim()
    .toLowerCase()
    .replaceAll("-", " ")
    .replaceAll("_", " ");

  if (!model) {
    return "unknown";
  }

  if (
    model === "luba3" ||
    model.includes("luba 3")
  ) {
    return "luba3";
  }

  if (
    model === "luba2" ||
    model.includes("luba 2")
  ) {
    return "luba2";
  }

  if (
    model === "luba1" ||
    model.includes("luba 1")
  ) {
    return "luba1";
  }

  if (
    model === "mini2" ||
    model.includes("mini 2")
  ) {
    return "mini2";
  }

  if (
    model === "mini1" ||
    model.includes("mini 1")
  ) {
    return "mini1";
  }

  return "unknown";
}