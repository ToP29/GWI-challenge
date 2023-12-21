import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/inter'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from '$routes/Root/Root'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles'
import Breed from '$routes/Breed/Breed'
import Breeds from '$routes/Breeds/Breeds'
import { QueryClient, QueryClientProvider } from 'react-query'

const theme = extendTheme({})

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />
	},
	{
		path: '/breeds/',
		element: <Breeds />
	}
])

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
			></CssVarsProvider>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
)
