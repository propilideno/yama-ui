import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.DBConnection': JSON.stringify(env.DBConnection),
      'process.env.DBName': JSON.stringify(env.DBName),
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
