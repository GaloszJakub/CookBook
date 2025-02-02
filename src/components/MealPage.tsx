import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

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

	const getIngredients = () => {
		if (!meal) return []
		const ingredients = []
		for (let i = 1; i <= 20; i++) {
			const ingredient = meal[`strIngredient${i}` as keyof Meal] as string | null
			const measure = meal[`strMeasure${i}` as keyof Meal] as string | null
			if (ingredient && ingredient.trim() !== '') {
				ingredients.push({ ingredient, measure })
			}
		}
		return ingredients
	}

	if (!meal) return <p>Loading...</p>

	return (
		<div className="bg-gray-100">
			<div className="container mx-auto p-4 ">
				<h1 className="text-3xl font-bold text-center">{meal.strMeal}</h1>

				<div className="flex justify-center mt-4">
					<button
						onClick={() => toggleFavourite(meal.idMeal)}
						className="text-red-500 text-4xl cursor-pointer hover:scale-110 transition">
						{favouriteMeals.includes(meal.idMeal) ? <IoMdHeart /> : <IoIosHeartEmpty />}
					</button>
				</div>
				<div className="flex flex-col  md:flex-row md:space-x-8 mt-8 ">
					<div className="md:w-2/5">
						<img
							src={meal.strMealThumb}
							alt={meal.strMeal}
							className="w-full max-w-md mx-auto my-4 rounded-lg shadow-md"
						/>
						<p className="text-lg text-gray-600 text-center italic">
							{meal.strCategory} - {meal.strArea}
						</p>

						{/* Sekcja składników */}
						<div className="bg-white p-4 rounded-lg shadow-md mt-6">
							<h2 className="text-xl font-semibold mb-3">Ingredients:</h2>
							<ul className="list-disc list-inside text-gray-700">
								{getIngredients().map((item, index) => (
									<li key={index} className="flex justify-between">
										<span>{item.ingredient}</span>
										<span className="font-semibold">{item.measure}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
					{/* Sekcja instrukcji */}
					<div className="bg-white p-4 rounded-lg shadow-md mt-4 md:w-3/5">
						<h2 className="text-xl font-semibold mb-3">Preparation:</h2>
						<div className="mt-4 space-y-4">
							{meal.strInstructions
								.split(/(?=Step \d+|STEP \d+)/) // Dzielenie instrukcji na kroki
								.map((step, index) => {
									const match = step.match(/(Step \d+|STEP \d+)(.*)/s) // Wydziela "Step X" i resztę tekstu
									const stepTitle = match ? match[1] : step // "Step X"
									const stepText = match ? match[2].trim() : '' // Reszta opisu

									return (
										<div key={index}>
											{index > 0 && <hr className="my-3 border-gray-300" />}
											<p className="text-center font-semibold text-lg text-gray-700">{stepTitle}</p>
											<p className="mt-1">{stepText}</p>
										</div>
									)
								})}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
