import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/inter'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TopNav from './modules/layout/TopNav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cats from '$routes/Cats/Cats'
import Breeds from '$routes/Breeds/Breeds'
import Favorites from '$routes/Favorites/Favorites'

const theme = extendTheme({})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CssVarsProvider
				defaultMode="dark"
				theme={theme}
				colorSchemeSelector="#demo_dark-mode-by-default"
				modeStorageKey="demo_dark-mode-by-default"
				disableNestedContext
			/>
			<BrowserRouter>
				<TopNav />
				<Routes>
					<Route path="/" element={<Cats />} />
					<Route path="/breeds" element={<Breeds />} />
					<Route path="/favorites" element={<Favorites />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
)
