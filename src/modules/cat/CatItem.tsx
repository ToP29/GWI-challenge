import { Card, CardContent, CardCover, Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { Cat } from './types'
import './CatItem.css'

function CatItem({ cat }: { cat: Cat }) {
	const navigate = useNavigate()
	return (
		<div
			className="cat"
			onClick={() => {
				navigate(`?id=${cat.id}`)
			}}
		>
			<Card sx={{ height: '100%' }}>
				<CardCover>
					<img src={cat.url} loading="lazy" alt={cat.id} />
				</CardCover>
				<CardCover
					sx={{
						background:
							'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)'
					}}
				/>
				<CardContent
					sx={{ justifyContent: 'flex-end', alignItems: 'start' }}
				>
					<Typography level="title-lg" textColor="#fff">
						{cat?.breeds[0]?.name ?? 'Míchačka'}
					</Typography>
					<Typography textColor="neutral.300">
						{cat?.breeds[0]?.origin ?? 'Earth'}
					</Typography>
				</CardContent>
			</Card>
		</div>
	)
}

export default CatItem
