import { Signal, signal } from '@preact/signals-react'
import { Cat } from './types'
import { uniqBy } from 'lodash-es'

export const page = signal(0)
export const cats: Signal<Cat[]> = signal([])
export const cat: Signal<Cat | null> = signal(null)
export const initialCatsLoading = signal(true)
export const additionalCatsLoading = signal(false)
export const isOpen = signal(false)

const API_KEY =
	'live_CbVJr4gepLqR2VixUSKzIZHk6bg6zlQUwiLgZBXvhHfyXyFza0bGVZUPe85QB6dM' // I would put this to env variable

export async function getInitialCats() {
	if (Array.isArray(cats.value) && cats.value.length > 0) return null
	initialCatsLoading.value = true
	await getCats()
	initialCatsLoading.value = false
	return cats.value
}

export async function getCats() {
	try {
		const res = await fetch(
			`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&limit=10&page=${page.value}&has_breeds=1`
		)
		const data: Cat[] = await res.json()
		cats.value = uniqBy([...cats.value, ...data], 'id')
	} catch (error) {
		console.error(error)
	}
}

export async function loadMoreCats() {
	additionalCatsLoading.value = true
	page.value++
	await getCats()
	additionalCatsLoading.value = false
}

export async function getCatById(id: string) {
	let _cat = cats.value.find((cat) => cat.id === id)
	if (!_cat) {
		try {
			const res = await fetch(
				`https://api.thecatapi.com/v1/images/${id}?api_key=${API_KEY}&limit=1&has_breeds=1`
			)
			_cat = await res.json()
			const isInCats = cats.value.some((__cat) => __cat.id === id)
			if (_cat && !isInCats) {
				cats.value = [...cats.value, _cat]
			}
		} catch (error) {
			console.error(error)
		}
	}
	if (_cat) {
		cat.value = _cat
	}
}
