import type { NovaMowerState } from "../types/mower-state";

export function resolveMowerState(
  rawState: string | undefined,
): NovaMowerState {
  const state = rawState?.trim().toLowerCase();

  if (!state || state === "unknown") {
    return "unknown";
  }

  if (
    state === "unavailable" ||
    state === "offline"
  ) {
    return "offline";
  }

  if (
    state === "mowing" ||
    state === "mähend" ||
    state === "mowing_task"
  ) {
    return "mowing";
  }

  if (
    state === "docked" ||
    state === "charging" ||
    state === "idle"
  ) {
    return "docked";
  }

  if (
    state === "returning" ||
    state === "returning_to_dock"
  ) {
    return "returning";
  }

  if (
    state === "error" ||
    state === "blocked"
  ) {
    return "error";
  }

  return "unknown";
}