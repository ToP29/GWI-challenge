import {
	CircularProgress,
	Modal,
	ModalClose,
	Sheet,
	Typography
} from '@mui/joy'
import { breed, getBreedByLocation, isOpen } from './handler'
import { useLocation, useNavigate } from 'react-router-dom'
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
										<img
											key={image?.id}
											src={image?.url}
											loading="lazy"
											alt={image?.id}
											style={{ maxWidth: '100%' }}
											onClick={() => {
												navigate(`/?id=${image?.id}`)
												isOpen.value = false
											}}
										/>
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
						<div className="attributes">
							<div className="title">Origin</div>
							<div className="value">{breed.value.origin}</div>
							<div className="title">Life span</div>
							<div className="value">{breed.value.life_span}</div>
							<div className="title">Adaptability</div>
							<div className="value">
								{breed.value.adaptability}
							</div>
							<div className="title">Affection level</div>
							<div className="value">
								{breed.value.affection_level}
							</div>
							<div className="title">Child friendly</div>
							<div className="value">
								{breed.value.child_friendly}
							</div>
							<div className="title">Dog friendly</div>
							<div className="value">
								{breed.value.dog_friendly}
							</div>
							<div className="title">Energy level</div>
							<div className="value">
								{breed.value.energy_level}
							</div>
							<div className="title">Intelligence</div>
							<div className="value">
								{breed.value.intelligence}
							</div>
						</div>
					</>
				)}
			</Sheet>
		</Modal>
	)
}

export default BreedModal
