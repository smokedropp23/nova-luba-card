export const theme = {
  colors: {
    background: "#111827",
    backgroundDeep: "#090D14",

    surface: "#1F2937",
    surfaceSoft: "#252D3A",
    border: "#374151",
    borderSoft: "rgba(255, 255, 255, 0.08)",

    primary: "#3B82F6",
    secondary: "#60A5FA",

    text: "#FFFFFF",
    textSecondary: "#9CA3AF",
    textMuted: "#6B7280",
  },

  states: {
    mowing: {
      color: "#65D344",
      soft: "rgba(101, 211, 68, 0.12)",
      glow: "rgba(101, 211, 68, 0.42)",
    },

    docked: {
      color: "#F7C843",
      soft: "rgba(247, 200, 67, 0.12)",
      glow: "rgba(247, 200, 67, 0.42)",
    },

    returning: {
      color: "#F7C843",
      soft: "rgba(247, 200, 67, 0.12)",
      glow: "rgba(247, 200, 67, 0.42)",
    },

    error: {
      color: "#EF4444",
      soft: "rgba(239, 68, 68, 0.13)",
      glow: "rgba(239, 68, 68, 0.45)",
    },

    maintenance: {
      color: "#F28C28",
      soft: "rgba(242, 140, 40, 0.13)",
      glow: "rgba(242, 140, 40, 0.45)",
    },

    update: {
      color: "#8B5CF6",
      soft: "rgba(139, 92, 246, 0.13)",
      glow: "rgba(139, 92, 246, 0.45)",
    },

    offline: {
      color: "#9CA3AF",
      soft: "rgba(156, 163, 175, 0.10)",
      glow: "rgba(156, 163, 175, 0.22)",
    },

    unknown: {
      color: "#F7C843",
      soft: "rgba(247, 200, 67, 0.12)",
      glow: "rgba(247, 200, 67, 0.35)",
    },
  },

  radius: {
    small: "10px",
    medium: "18px",
    large: "28px",
    pill: "999px",
  },

  shadow: {
    card: "0 8px 24px rgba(0, 0, 0, 0.35)",
    elevated: "0 18px 48px rgba(0, 0, 0, 0.42)",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  animation: {
    fast: "150ms",
    normal: "300ms",
    slow: "600ms",
  },
} as const;

export type NovaTheme = typeof theme;