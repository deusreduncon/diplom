import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins:[
	react({
	jsxRuntime:'automatic',
}),
], 
  server: {
    proxy: {
      '/': 'http://localhost:3001',
      // или вообще весь /api, если есть
    }
  }
})

