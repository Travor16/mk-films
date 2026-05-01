import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        // Allow serving files from the project root
        'C:/Users/J0SC0M/LUXFLIX',
        // Allow serving files from public
        'C:/Users/J0SC0M/LUXFLIX/public',
      ],
    },
  },
})
