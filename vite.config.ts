import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			$src: path.resolve(__dirname, './src/'),
			$lib: `${path.resolve(__dirname, './src/lib/')}`,
			$components: `${path.resolve(__dirname, './src/components/')}`,
			$routes: `${path.resolve(__dirname, './src/routes/')}`,
			$assets: `${path.resolve(__dirname, './src/assets/')}`
		}
	}
})
