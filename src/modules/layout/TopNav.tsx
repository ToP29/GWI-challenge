import { Button } from '@mui/joy'
import './TopNav.css'
import { useNavigate } from 'react-router-dom'

function TopNav() {
	const navigate = useNavigate()

	return (
		<div className="top-nav">
			<Button
				variant="soft"
				color="neutral"
				size="lg"
				onClick={() => navigate('/')}
			>
				Cats
			</Button>
			<Button
				variant="soft"
				color="neutral"
				size="lg"
				onClick={() => navigate('/breeds')}
			>
				Breeds
			</Button>
			<Button
				variant="soft"
				color="neutral"
				size="lg"
				onClick={() => navigate('/favorites')}
			>
				Favorites
			</Button>
		</div>
	)
}

export default TopNav
