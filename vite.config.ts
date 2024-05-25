import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.YamaDBConnection': JSON.stringify(env.YamaDBConnection),
      'process.env.YamaDBUrl': JSON.stringify(env.YamaDBUrl)
    },
    server: {
      hmr: true,
      port: 3000
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
