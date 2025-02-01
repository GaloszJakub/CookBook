import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cookies from 'cookies-ts'
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io'
import { useFavourites } from '../hooks/useFavourites'

interface Meal {
	idMeal: number
	strMeal: string
	strMealThumb: string
	strCategory: string
	strArea: string
	strInstructions: string
}

const cookies = new Cookies()

export default function MealPage() {
	const { id } = useParams<{ id: string }>() // Pobiera ID z URL
	const [meal, setMeal] = useState<Meal | null>(null)
	const { favouriteMeals, toggleFavourite } = useFavourites()


	

	// Pobieranie danych o danym posiłku
	useEffect(() => {
		const fetchMeal = async () => {
			try {
				const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
				const data = await response.json()
				if (data.meals) {
					setMeal(data.meals[0])
				}
			} catch (error) {
				console.error('Error fetching meal:', error)
			}
		}

		fetchMeal()
	}, [id])

	

	if (!meal) return <p>Ładowanie...</p>

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold text-center">{meal.strMeal}</h1>
			<div className="flex justify-center mt-4">
				<button
					onClick={() => toggleFavourite(meal.idMeal)}
					className="text-red-500 text-4xl cursor-pointer hover:scale-110 transition">
					{favouriteMeals.includes(meal.idMeal) ? <IoMdHeart /> : <IoIosHeartEmpty />}
				</button>
			</div>
			<img src={meal.strMealThumb} alt={meal.strMeal} className="w-full max-w-md mx-auto my-4 rounded-lg shadow-md" />
			<p className="text-lg text-gray-600 text-center">{meal.strCategory} - {meal.strArea}</p>
			<p className="mt-4">{meal.strInstructions}</p>
		</div>
	)
}
