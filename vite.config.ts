/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const config = {
    base: "/",
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/utils/testUtils/setup.ts",
      css: true,
    },
    resolve: {
      alias: {
        Components: "/src/Components",
        utils: "/src/utils",
        providers: "/src/providers",
      },
    },
  };

  if (command === "build") {
    // base for github pages deployment
    config.base = "/codekeeper-project/";
  }
  return config;
});
