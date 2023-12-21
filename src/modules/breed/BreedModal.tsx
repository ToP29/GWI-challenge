import {
	Button,
	CardActions,
	CircularProgress,
	Modal,
	ModalClose,
	Sheet,
	Typography
} from '@mui/joy'
import { breed, getBreedByLocation, isOpen } from './handler'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import './BreedModal.css'

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
				{!breed.value || breedQuery.isPending ? (
					<CircularProgress />
				) : (
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
						<div className="images">
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
						</div>

						<Typography
							id="modal-desc"
							textColor="text.tertiary"
							sx={{ mt: 2 }}
						>
							{breed.value.description}
						</Typography>
					</>
				)}
			</Sheet>
		</Modal>
	)
}

export default BreedModal
