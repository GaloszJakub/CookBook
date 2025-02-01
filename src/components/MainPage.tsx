import { useState, useEffect } from 'react'
import MealList from './MealList'
import CategoryDropdown from './CategoryDropdown'
import FavouriteList from './FavouriteList'
import { useFavourites } from '../hooks/useFavourites'

// Definicja typów
interface Meal {
	idMeal: number
	strMeal: string
	strMealThumb: string
	strCategory: string
	strArea: string
}

interface Category {
	idCategory: string
	strCategory: string
}

export default function MainPage() {
	const [meals, setMeals] = useState<Meal[]>([])
	const [filteredMeals, setFilteredMeals] = useState<Meal[]>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [visibleMealsCount, setVisibleMealsCount] = useState<number>(8)
	const { favouriteMeals, toggleFavourite } = useFavourites()

	// Pobieranie danych
	useEffect(() => {
		const fetchMeals = async () => {
			try {
				const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
				const data = await response.json()
				if (data.meals) {
					setMeals(data.meals)
					setFilteredMeals(data.meals) // Domyślnie pokazujemy wszystkie
				}
			} catch (error) {
				console.error('Błąd podczas pobierania posiłków:', error)
			}
		}

		const fetchCategories = async () => {
			try {
				const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
				const data = await response.json()
				if (data.categories) {
					setCategories(data.categories)
				}
			} catch (error) {
				console.error('Błąd podczas pobierania kategorii:', error)
			}
		}

		fetchMeals()
		fetchCategories()
	}, [])

	// Filtrowanie posiłków po kategorii
	const filterMealsByCategory = (category: string) => {
		setSelectedCategory(category)
		if (category === '') {
			setFilteredMeals(meals)
		} else {
			setFilteredMeals(meals.filter(meal => meal.strCategory === category))
		}
	}

	// Pokazywanie większej liczby posiłków
	const showMoreMeals = () => {
		setVisibleMealsCount(prevCount => prevCount + 8)
	}

	return (
		<div className='bg-gray-100'>
			<div className="container mx-auto p-4">
				<CategoryDropdown categories={categories} selectedCategory={selectedCategory} filterMealsByCategory={filterMealsByCategory} />
				<div className="flex flex-col-reverse lg:flex-row gap-6 mt-10">
					{/* Lista posiłków */}
					<div className="lg:w-3/4">
						<MealList meals={filteredMeals} visibleMealsCount={visibleMealsCount} favouriteMeals={favouriteMeals} toggleFavourite={toggleFavourite} />
						{filteredMeals.length > visibleMealsCount && (
							<div className="flex mt-6 justify-center">
								<button
									onClick={showMoreMeals}
									className="px-6 py-2 border-2 border-blue-500 rounded-full hover:bg-blue-500 duration-300 hover:text-white cursor-pointer">
									Pokaż więcej
								</button>
							</div>
						)}
					</div>

					{/* Ulubione */}
					<div className="lg:w-1/4 mb-20">
						<FavouriteList meals={meals} favouriteMeals={favouriteMeals} />
					</div>
				</div>
			</div>
		</div>
	)
}
