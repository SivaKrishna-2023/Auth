import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: true,            // Bind to 0.0.0.0 for Render
    port: Number(process.env.PORT) || 5173,
    allowedHosts: 'all',   // Allow all hosts (Render deployment safe)
  },
})
