import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'naturally-otherwise-results-milk.trycloudflare.com'
    ],
    cors: {
      origin: ['https://naturally-otherwise-results-milk.trycloudflare.com'],
      credentials: true
    }
  }
})
