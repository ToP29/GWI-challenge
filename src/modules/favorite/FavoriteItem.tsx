import { Card, CardContent, CardCover, IconButton, Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import { Cat } from '../cat/types'
import './FavoriteItem.css'
import { Favorite } from '@mui/icons-material'
import { removeCatFromFavorites } from './handler'

function FavoriteItem({ cat }: { cat: Cat }) {
	return (
		<div className="favorite">
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
					sx={{
						alignItems: 'flex-end',
						width: '100%',
						height: '100%',
						display: 'flex',
						flexDirection: 'row'
					}}
				>
					<div style={{ flex: 1 }}>
						<Typography level="title-lg" textColor="#fff">
							{cat?.breeds[0]?.name ?? 'Míchačka'}
						</Typography>
						<Typography textColor="neutral.300">
							{cat?.breeds[0]?.origin ?? 'Earth'}
						</Typography>
					</div>
					<IconButton
						variant="plain"
						color="danger"
						sx={{ mr: 'auto' }}
						onClick={() => {
							removeCatFromFavorites(cat)
						}}
					>
						<Favorite />
					</IconButton>
				</CardContent>
			</Card>
		</div>
	)
}

export default FavoriteItem
