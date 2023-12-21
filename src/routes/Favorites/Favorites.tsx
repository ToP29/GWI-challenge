import { Box, Typography } from '@mui/joy'
import './Favorites.css'
import { favorites } from '$modules/favorite/handler'
import FavoriteItem from '$src/modules/favorite/FavoriteItem'

function Root() {
	return (
		<>
			<Typography level="h1" m={5}>
				Favorites
			</Typography>
			<Box p={5}>
				<div className="cats">
					{Array.isArray(favorites.value) &&
					favorites.value.length > 0 ? (
						<>
							{favorites.value.map((cat) => (
								<FavoriteItem key={cat.id} cat={cat} />
							))}
						</>
					) : (
						<div>No favorites</div>
					)}
				</div>
			</Box>
		</>
	)
}

export default Root
