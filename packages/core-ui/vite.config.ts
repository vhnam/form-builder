import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        button: path.resolve(__dirname, "src/components/ui/button.tsx"),
        card: path.resolve(__dirname, "src/components/ui/card.tsx"),
      },
      name: "CoreUI",
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "global.css") {
            return "styles.css";
          }
          return assetInfo.name || "assets/[name].[ext]";
        },
      },
    },
    copyPublicDir: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
