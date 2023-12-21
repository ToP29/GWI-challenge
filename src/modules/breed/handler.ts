import { Signal, signal } from '@preact/signals-react'
import { Breed } from './types'
import { uniqBy } from 'lodash-es'

export const page = signal(0)
export const breeds: Signal<Breed[]> = signal([])
export const breed: Signal<Breed | null> = signal(null)
export const initialBreedsLoading = signal(true)
export const additionalBreedsLoading = signal(false)
export const isOpen = signal(false)

const API_KEY =
	'live_CbVJr4gepLqR2VixUSKzIZHk6bg6zlQUwiLgZBXvhHfyXyFza0bGVZUPe85QB6dM' // I would put this to env variable

export async function getInitialBreeds() {
	if (Array.isArray(breeds.value) && breeds.value.length > 0) return null
	initialBreedsLoading.value = true
	await getBreeds()
	initialBreedsLoading.value = false
	return breeds.value
}

export async function getBreeds() {
	try {
		const res = await fetch(
			`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}&limit=10&page=${page.value}`
		)
		const data: Breed[] = await res.json()
		breeds.value = uniqBy([...breeds.value, ...data], 'id')
	} catch (error) {
		console.error(error)
	}
}

export async function loadMoreBreeds() {
	additionalBreedsLoading.value = true
	page.value++
	await getBreeds()
	additionalBreedsLoading.value = false
}

export async function getBreedById(id: string) {
	let _breed = breeds.value.find((breed) => breed.id === id)
	if (!_breed) {
		try {
			const res = await fetch(
				`https://api.thecatapi.com/v1/breeds/${id}?api_key=${API_KEY}&limit=1`
			)
			_breed = await res.json()
		} catch (error) {
			console.error(error)
		}
	}
	if (_breed) {
		if (!_breed.images) {
			const images = await getBreedImages(_breed.id)
			_breed.images = images
			if (!_breed.image) {
				_breed.image = images[0]
			}
		}
		const isInBreeds = breeds.value.some((__breed) => __breed.id === id)
		if (!isInBreeds) {
			breeds.value = [...breeds.value, _breed]
		}
		breed.value = _breed
	}
}

async function getBreedImages(breedId: string) {
	try {
		const res = await fetch(
			`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}&limit=4`
		)
		return await res.json()
	} catch (error) {
		console.error(error)
	}
}

export async function getBreedByLocation() {
	const id = new URLSearchParams(window.location.search).get('id')
	if (!id) return null
	isOpen.value = true
	await getBreedById(id)
	return breed.value
}
