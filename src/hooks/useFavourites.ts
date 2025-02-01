import { useEffect, useState } from 'react'
import Cookies from 'cookies-ts'

const cookies = new Cookies()

export function useFavourites() {
	const [favouriteMeals, setFavouriteMeals] = useState<number[]>([])

	// Pobieranie ulubionych z cookies przy pierwszym uruchomieniu
	useEffect(() => {
		const storedFavourites = cookies.get('favouriteMeals')
		if (storedFavourites && storedFavourites.length>0) {
			setFavouriteMeals(JSON.parse(storedFavourites))
		}
	}, [])

	// Zapis ulubionych do cookies przy każdej zmianie
	useEffect(() => {
		if(favouriteMeals && favouriteMeals.length>0) cookies.set('favouriteMeals', JSON.stringify(favouriteMeals), { expires: 365 })
	}, [favouriteMeals])

	// Dodawanie / usuwanie ulubionych
	const toggleFavourite = (id: number) => {
		setFavouriteMeals(prevFavourites =>
			prevFavourites.includes(id) ? prevFavourites.filter(fav => fav !== id) : [...prevFavourites, id]
		)
	}

	// Sprawdzenie, czy dany posiłek jest w ulubionych
	const isFavourite = (id: number) => favouriteMeals.includes(id)

	return { favouriteMeals, toggleFavourite, isFavourite }
}
