import { Button, Card, Box, Typography, CircularProgress } from '@mui/joy'
import './Cats.css'
import {
	additionalCatsLoading,
	cats,
	initialCatsLoading,
	loadMoreCats,
	getInitialCats
} from '$modules/cat/handler'
import CatItem from '$modules/cat/CatItem'
import CatModal from '$src/modules/cat/CatModal'
import { useQuery } from '@tanstack/react-query'

function Root() {
	const catsQuery = useQuery({
		queryKey: ['cats'],
		queryFn: getInitialCats
	})

	return (
		<>
			<Typography level="h1" m={5}>
				Cats
			</Typography>
			<Box p={5}>
				<div className="cats">
					{initialCatsLoading.value ? (
						<CircularProgress size="lg" />
					) : Array.isArray(cats.value) && cats.value.length > 0 ? (
						<>
							{cats.value.map((cat) => (
								<CatItem key={cat.id} cat={cat} />
							))}
						</>
					) : (
						<div>No cats</div>
					)}
				</div>
				{initialCatsLoading.value !== true && (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingBlock: '2em'
						}}
					>
						<Button
							onClick={() => loadMoreCats()}
							loading={additionalCatsLoading.value}
						>
							Load 10 more cats
						</Button>
					</Box>
				)}
			</Box>
			<CatModal />
		</>
	)
}

export default Root
