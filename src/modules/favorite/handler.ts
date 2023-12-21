import { Signal, signal } from '@preact/signals-react'
import { Cat } from '../cat/types'

export const page = signal(0)
export const favorites: Signal<Cat[]> = signal(getFavoritesFromLocalStorage())

function getFavoritesFromLocalStorage() {
	const favorites = localStorage.getItem('favorites')
	if (favorites) {
		return JSON.parse(favorites)
	}
	return []
}

export function addCatToFavorites(cat: Cat | null) {
	if (!cat) return
	if (favorites.value.some((fav) => fav.id === cat.id)) return
	favorites.value = [...favorites.value, cat]
	updateLocalStorage()
}

export function removeCatFromFavorites(cat: Cat | null) {
	if (!cat) return
	favorites.value = favorites.value.filter((fav) => fav.id !== cat.id)
	updateLocalStorage()
}

function updateLocalStorage() {
	localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

export function toggleFavorite(cat: Cat | null) {
	if (!cat) return
	if (favorites.value.some((fav) => fav.id === cat.id)) {
		removeCatFromFavorites(cat)
	} else {
		addCatToFavorites(cat)
	}
}
