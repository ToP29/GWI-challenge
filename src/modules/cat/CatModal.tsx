import {
	Button,
	CardActions,
	IconButton,
	Modal,
	ModalClose,
	Sheet,
	Typography
} from '@mui/joy'
import { cat, isOpen } from './handler'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCatById } from './handler'
import { useEffect } from 'react'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import {
	addCatToFavorites,
	favorites,
	removeCatFromFavorites
} from '../favorite/handler'

function CatModal() {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const id = new URLSearchParams(location.search).get('id')
		if (id) {
			isOpen.value = true
			getCatById(id)
		}
	}, [location])

	return (
		cat.value && (
			<Modal
				aria-labelledby="modal-title"
				aria-describedby="modal-desc"
				open={isOpen.value}
				onClose={() => {
					navigate('/')
					isOpen.value = false
				}}
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Sheet
					variant="outlined"
					sx={{
						maxWidth: 500,
						borderRadius: 'md',
						p: 3,
						boxShadow: 'lg'
					}}
				>
					<ModalClose variant="plain" sx={{ m: 1 }} />

					<Typography
						component="h2"
						id="modal-title"
						level="h4"
						textColor="inherit"
						fontWeight="lg"
						sx={{ mb: 2 }}
					>
						{cat.value?.breeds[0]?.name ?? 'Míchačka'}
					</Typography>

					<img
						src={cat.value.url}
						loading="lazy"
						alt={cat.value.id}
						style={{ maxWidth: '100%' }}
					/>
					<Typography
						id="modal-desc"
						textColor="text.tertiary"
						sx={{ mt: 2 }}
					>
						{cat.value?.breeds[0]?.description}
					</Typography>
					<CardActions buttonFlex="0 1 120px" sx={{ mt: 4 }}>
						{favorites.value.includes(cat.value) ? (
							<IconButton
								variant="plain"
								color="danger"
								sx={{ mr: 'auto' }}
								onClick={() => {
									removeCatFromFavorites(cat.value)
								}}
							>
								<Favorite />
							</IconButton>
						) : (
							<IconButton
								variant="plain"
								color="neutral"
								sx={{ mr: 'auto' }}
								onClick={() => {
									addCatToFavorites(cat.value)
								}}
							>
								<FavoriteBorder />
							</IconButton>
						)}
						<Button
							variant="solid"
							color="primary"
							onClick={() => {
								const breedId = cat.value?.breeds[0]?.id
								if (breedId) {
									navigate(`/breeds?id=${breedId}`)
									isOpen.value = false
									cat.value = null
								}
							}}
						>
							Breed detail
						</Button>
					</CardActions>
				</Sheet>
			</Modal>
		)
	)
}

export default CatModal
