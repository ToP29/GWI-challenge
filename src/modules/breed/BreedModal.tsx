import {
	Button,
	CardActions,
	CircularProgress,
	IconButton,
	Modal,
	ModalClose,
	Sheet,
	Typography
} from '@mui/joy'
import { breed, getBreedByLocation, isOpen } from './handler'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FavoriteBorder } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'

function BreedModal() {
	const navigate = useNavigate()
	const location = useLocation()

	const breedQuery = useQuery({
		queryKey: ['breed', location.search],
		queryFn: getBreedByLocation
	})

	return (
		<Modal
			aria-labelledby="modal-title"
			aria-describedby="modal-desc"
			open={isOpen.value}
			onClose={() => {
				navigate('/breeds')
				breed.value = null
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
				{breedQuery.isLoading ? (
					<CircularProgress />
				) : breed.value ? (
					<>
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
									<Link
										to={`/?id=${image?.id}`}
										key={image?.id}
									>
										<img
											key={image?.id}
											src={image?.url}
											loading="lazy"
											alt={image?.id}
											style={{ maxWidth: '100%' }}
										/>
									</Link>
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
									if (breedId) {
										navigate(`/breeds?id=${breedId}`)
										breed.value = null
										isOpen.value = false
									}
								}}
							>
								Breed detail
							</Button>
						</CardActions>
					</>
				) : (
					<div>no breed</div>
				)}
			</Sheet>
		</Modal>
	)
}

export default BreedModal
