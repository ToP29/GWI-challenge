import { Card, CardContent, CardCover, Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { Breed } from './types'
import './BreedItem.css'

function BreedItem({ breed }: { breed: Breed }) {
	const navigate = useNavigate()
	return (
		<div
			className="breed"
			onClick={() => {
				navigate(`?id=${breed.id}`)
			}}
		>
			<Card sx={{ height: '100%' }}>
				<CardCover>
					<img
						src={breed.image?.url}
						loading="lazy"
						alt={breed.image?.id}
					/>
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
						{breed?.name ?? 'Míchačka'}
					</Typography>
					<Typography textColor="neutral.300">
						{breed?.origin ?? 'Earth'}
					</Typography>
				</CardContent>
			</Card>
		</div>
	)
}

export default BreedItem
