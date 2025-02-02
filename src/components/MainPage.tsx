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
	const [visibleMealsCount, setVisibleMealsCount] = useState<number>(8)
	const [searchTerm, setSearchTerm] = useState<string>('') // 🔹 Stan wyszukiwania
	const { favouriteMeals, toggleFavourite } = useFavourites()

	// Pobieranie danych
	useEffect(() => {
		const loadData = async () => {
			const mealsData = await fetchMeals()
			const categoriesData = await fetchCategories()

			setMeals(mealsData)
			setFilteredMeals(mealsData) // Domyślnie pokazujemy wszystkie
			setCategories(categoriesData)
		}

		loadData()
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

	// 🔎 WYSZUKIWANIE
	const handleSearch = (term: string) => {
		setSearchTerm(term)
		const filtered = meals.filter(meal =>
			meal.strMeal.toLowerCase().includes(term.toLowerCase()) // Filtrowanie po nazwie
		)
		setFilteredMeals(filtered)
	}

	return (
		<div className="bg-gray-100">
			<NavBar searchTerm={searchTerm} onSearch={handleSearch} /> {/* 🔹 Przekazujemy propsy */}

			<div className="container mx-auto p-4">
				<CategoryDropdown categories={categories} selectedCategory={selectedCategory} filterMealsByCategory={filterMealsByCategory} />
				<div className="flex flex-col-reverse lg:flex-row gap-6 mt-10">
					{/* Lista posiłków */}
					<div className="lg:w-3/4">
						<MealList meals={filteredMeals} visibleMealsCount={visibleMealsCount} favouriteMeals={favouriteMeals} toggleFavourite={toggleFavourite} />
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
