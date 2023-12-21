import { Button, Card, Box, Typography, CircularProgress } from '@mui/joy'
import './Breeds.css'
import {
	additionalBreedsLoading,
	breeds,
	initialBreedsLoading,
	loadMoreBreeds,
	getInitialBreeds
} from '$modules/breed/handler'
import BreedItem from '$modules/breed/BreedItem'
import BreedModal from '$src/modules/breed/BreedModal'
import { useQuery } from '@tanstack/react-query'

function Root() {
	const breedsQuery = useQuery({
		queryKey: ['breeds'],
		queryFn: getInitialBreeds
	})
	return (
		<>
			<Typography level="h1" m={5}>
				Breeds
			</Typography>
			<Box p={5}>
				<div className="breeds">
					{initialBreedsLoading.value ? (
						<CircularProgress size="lg" />
					) : Array.isArray(breeds.value) &&
					  breeds.value.length > 0 ? (
						<>
							{breeds.value.map((breed) => (
								<BreedItem key={breed.id} breed={breed} />
							))}
						</>
					) : (
						<div>No breeds</div>
					)}
				</div>
				{initialBreedsLoading.value !== true && (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingBlock: '2em'
						}}
					>
						<Button
							onClick={() => loadMoreBreeds()}
							loading={additionalBreedsLoading.value}
						>
							Load 10 more breeds
						</Button>
					</Box>
				)}
			</Box>
			<BreedModal />
		</>
	)
}

export default Root
