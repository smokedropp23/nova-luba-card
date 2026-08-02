import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "NovaLubaCard",
      fileName: () => "nova-luba-card.js",
      formats: ["es"]
    },
    outDir: "dist",
    emptyOutDir: true
  }
});