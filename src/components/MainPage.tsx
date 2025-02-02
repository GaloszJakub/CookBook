import { useState, useEffect } from 'react'
import MealList from './MealList'
import CategoryDropdown from './CategoryDropdown'
import FavouriteList from './FavouriteList'
import NavBar from './NavBar'
import { useFavourites } from '../hooks/useFavourites'
import { fetchMeals, fetchCategories } from '../services/mealService'

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
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [visibleMealsCount, setVisibleMealsCount] = useState<number>(8)
	const { favouriteMeals, toggleFavourite } = useFavourites()

	// Pobieranie danych
	useEffect(() => {
		const loadData = async () => {
			const mealsData = await fetchMeals()
			const categoriesData = await fetchCategories()

			if (mealsData.length) setMeals(mealsData)
			if (categoriesData.length) setCategories(categoriesData)

			setFilteredMeals(mealsData) // Domyślnie pokazujemy wszystkie
		}

		loadData()
	}, [])

	// 🔹 Filtrowanie posiłków (kategorie + wyszukiwanie)
	useEffect(() => {
		let updatedMeals = meals

		if (selectedCategory) {
			updatedMeals = updatedMeals.filter(meal => meal.strCategory === selectedCategory)
		}

		if (searchTerm) {
			updatedMeals = updatedMeals.filter(meal =>
				meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
			)
		}

		setFilteredMeals(updatedMeals)
	}, [selectedCategory, searchTerm, meals])

	return (
		<div className="bg-gray-100">
			<NavBar searchTerm={searchTerm} onSearch={setSearchTerm} />

			<div className="container mx-auto p-4">
				<CategoryDropdown
					categories={categories}
					selectedCategory={selectedCategory}
					filterMealsByCategory={setSelectedCategory}
				/>
				<div className="flex flex-col-reverse lg:flex-row gap-6 mt-10">
					{/* Lista posiłków */}
					<div className="lg:w-3/4">
						<MealList
							meals={filteredMeals.slice(0, visibleMealsCount)}
							favouriteMeals={favouriteMeals}
							toggleFavourite={toggleFavourite} visibleMealsCount={0}						/>
						{filteredMeals.length > visibleMealsCount && (
							<div className="flex mt-6 justify-center">
								<button
									onClick={() => setVisibleMealsCount(prev => prev + 8)}
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
