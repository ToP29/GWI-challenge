import {
	Button,
	CardActions,
	IconButton,
	Modal,
	ModalClose,
	Sheet,
	Typography
} from '@mui/joy'
import { breed, isOpen } from './handler'
import { useLocation, useNavigate } from 'react-router-dom'
import { getBreedById } from './handler'
import { useEffect } from 'react'
import { FavoriteBorder } from '@mui/icons-material'

function BreedModal() {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const id = new URLSearchParams(location.search).get('id')
		if (id) {
			isOpen.value = true
			getBreedById(id)
		}
	}, [location])

	return (
		breed.value && (
			<Modal
				aria-labelledby="modal-title"
				aria-describedby="modal-desc"
				open={isOpen.value}
				onClose={() => {
					navigate('/breeds')
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
						{breed.value.name ?? 'Míchačka'}
					</Typography>
					{breed.value.images?.length > 0
						? breed.value.images.map((image) => (
								<img
									key={image?.id}
									src={image?.url}
									loading="lazy"
									alt={image?.id}
									style={{ maxWidth: '100%' }}
								/>
							))
						: 'none images'}

					<Typography
						id="modal-desc"
						textColor="text.tertiary"
						sx={{ mt: 2 }}
					>
						{breed.value.description}
					</Typography>
					<CardActions buttonFlex="0 1 120px" sx={{ mt: 4 }}>
						<IconButton
							variant="outlined"
							color="neutral"
							sx={{ mr: 'auto' }}
						>
							<FavoriteBorder />
						</IconButton>
						<Button
							variant="solid"
							color="primary"
							onClick={() => {
								const breedId = breed.value.id
								if (breedId) navigate(`/breeds?id=${breedId}`)
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

export default BreedModal
