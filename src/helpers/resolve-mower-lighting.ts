import { defaultMowerLighting } from "../constants/mower-lighting-config";

import type { NovaMowerState } from "../types/mower-state";
import type { MowerLighting } from "../types/mower-lighting";

export function resolveMowerLighting(
  state: NovaMowerState,
): MowerLighting {
  switch (state) {
    case "mowing":
      return {
        ring: {
          visible: true,
          color: "#22c55e",
          brightness: 1,
          animation: "pulse",
        },

        front: {
          visible: true,
          color: "#ffffff",
          brightness: 0.9,
          animation: "none",
        },

        side: {
          visible: true,
          color: "#22c55e",
          brightness: 0.8,
          animation: "breathe",
        },
      };

    case "returning":
      return {
        ring: {
          visible: true,
          color: "#facc15",
          brightness: 1,
          animation: "blink",
        },

        front: {
          visible: true,
          color: "#ffffff",
          brightness: 1,
          animation: "none",
        },

        side: {
          visible: true,
          color: "#facc15",
          brightness: 0.85,
          animation: "pulse",
        },
      };

    case "docked":
      return {
        ring: {
          visible: true,
          color: "#3b82f6",
          brightness: 0.75,
          animation: "breathe",
        },

        front: {
          visible: false,
          color: "#ffffff",
          brightness: 0,
          animation: "none",
        },

        side: {
          visible: true,
          color: "#3b82f6",
          brightness: 0.45,
          animation: "none",
        },
      };

    case "error":
      return {
        ring: {
          visible: true,
          color: "#ef4444",
          brightness: 1,
          animation: "blink",
        },

        front: {
          visible: true,
          color: "#ef4444",
          brightness: 1,
          animation: "blink",
        },

        side: {
          visible: true,
          color: "#ef4444",
          brightness: 1,
          animation: "blink",
        },
      };

    case "maintenance":
      return {
        ring: {
          visible: true,
          color: "#f97316",
          brightness: 0.85,
          animation: "pulse",
        },

        front: {
          visible: false,
          color: "#ffffff",
          brightness: 0,
          animation: "none",
        },

        side: {
          visible: true,
          color: "#f97316",
          brightness: 0.65,
          animation: "breathe",
        },
      };

    case "update":
      return {
        ring: {
          visible: true,
          color: "#06b6d4",
          brightness: 1,
          animation: "pulse",
        },

        front: {
          visible: false,
          color: "#ffffff",
          brightness: 0,
          animation: "none",
        },

        side: {
          visible: true,
          color: "#06b6d4",
          brightness: 0.8,
          animation: "pulse",
        },
      };

    case "offline":
    case "unknown":
    default:
      return structuredClone(defaultMowerLighting);
  }
}