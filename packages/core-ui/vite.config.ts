import { defineConfig } from "vite";
import dts from "unplugin-dts/vite";
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
        components: path.resolve(__dirname, "src/components/index.ts"),
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
