//import { Tab, TabGroup, TabList } from '@headlessui/react'
import Cookies from 'cookies-ts'
import { useState, useEffect } from 'react'
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

// Definicja typu Meal
interface Meal {
	idMeal: number
	strMeal: string
	strMealThumb: string
	strCategory: string
	strArea: string
}

// Definicja typu Category
interface Category {
	idCategory: string
	strCategory: string
	strCategoryThumb: string
	strCategoryDescription: string
}

const cookies = new Cookies()

export default function MainPage() {
	const [meals, setMeals] = useState<Meal[]>([])
	const [filteredMeals, setFilteredMeals] = useState<Meal[]>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [visibleMealsCount, setVisibleMealsCount] = useState<number>(8)
	const [favouriteMeals, setFavouriteMeals] = useState<number[]>([])

	// Wczytywanie ulubionych posiłków z cookies
	useEffect(() => {
		const storedFavourites = cookies.get('favouriteMeals')
		if (storedFavourites) {
			setFavouriteMeals(JSON.parse(storedFavourites))
		}
	}, [])

	// Zapisywanie ulubionych posiłków w cookies
	useEffect(() => {
		cookies.set('favouriteMeals', JSON.stringify(favouriteMeals), { expires: 365 })
	}, [favouriteMeals])

	useEffect(() => {
		const storedFavourites = cookies.get('favouriteMeals')
		if (storedFavourites) {
			setFavouriteMeals(JSON.parse(storedFavourites))
		}
	}, [])

	// Dodawanie ulubionego posiłku
	const toggleFavourite = (id: number) => {
		setFavouriteMeals(prevFavorites =>
			prevFavorites.includes(id) ? prevFavorites.filter(fav => fav !== id) : [...prevFavorites, id]
		)
	}

	// Pobieranie danych z API
	useEffect(() => {
		const fetchMeals = async () => {
			try {
				const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
				const data = await response.json()
				if (data.meals) {
					setMeals(data.meals)
					setFilteredMeals(data.meals)
				}
			} catch (error) {
				console.error('Error fetching meals:', error)
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
				console.error('Error fetching categories:', error)
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

	// Inicjalizacja filtrowania po pobraniu posiłków
	useEffect(() => {
		filterMealsByCategory('')
	}, [meals])

	// Pokazywanie większej liczby posiłków
	const showMoreMeals = () => {
		setVisibleMealsCount(prevCount => prevCount + 8)
	}

	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="bg-[#f4f4f4]">
			<div className="container mx-auto p-4">
				<div className="relative w-full max-w-xs mx-auto">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="w-full flex justify-between items-center bg-white shadow-md px-4 py-2 rounded-lg text-gray-700 font-medium transition hover:bg-gray-100">
						{selectedCategory || 'Wybierz kategorię'}
						{isOpen ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
					</button>
					{/* Lista kategorii */}
					<AnimatePresence>
						{isOpen && (
							<motion.ul
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="absolute w-full bg-white shadow-md mt-2 rounded-lg overflow-hidden z-10">
								<li
									onClick={() => {
										filterMealsByCategory('')
										setIsOpen(false)
									}}
									className="px-4 py-2 cursor-pointer hover:bg-gray-100">
									Wszystkie
								</li>

								{categories.map(category => (
									<li
										key={category.idCategory}
										onClick={() => {
											filterMealsByCategory(category.strCategory)
											setIsOpen(false)
										}}
										className="px-4 py-2 cursor-pointer hover:bg-gray-100">
										{category.strCategory}
									</li>
								))}
							</motion.ul>
						)}
					</AnimatePresence>
				</div>
				{/* Lista posiłków */}
				<div className="flex  gap-6 mt-20  flex-col-reverse lg:flex-row mx-auto ">
					<div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-10 gap-y-20  ">
						{filteredMeals.slice(0, visibleMealsCount).map(meal => (
							<div
								key={meal.idMeal}
								className="bg-white p-4 relative shadow-md rounded-md w-max mx-auto px-20 sm:w-full sm:px-4">
								<div
									className="bg-cover w-[200px] h-[170px] bg-center absolute top-[-30px] left-1/2 -translate-x-1/2 shadow-lg rounded-md"
									style={{ backgroundImage: `url(${meal.strMealThumb})` }}></div>
								<h3 className="mt-35 text-xl text-center font-semibold">{meal.strMeal}</h3>
								<p className="text-center text-gray-500">{meal.strCategory}</p>
								<p className="text-center text-gray-500">{meal.strArea}</p>
								<div className="flex justify-around gap-4 mt-2">
									<button
										onClick={() => toggleFavourite(meal.idMeal)}
										className="text-red-500 text-2xl cursor-pointer hover:scale-150 scale-130 duration-300">
										{favouriteMeals.includes(meal.idMeal) ? <IoMdHeart /> : <IoIosHeartEmpty />}
									</button>
									<p className=" bg-blue-500 px-2 py-1 rounded-full font-semibold tracking-wide cursor-pointer hover:scale-105 duration-300 text-white w-full text-center">
										Sprawdź!
									</p>
								</div>
							</div>
						))}
					</div>
					{/* Ulubione */}
					<div className="lg:w-1/4 mb-20">
						<div className="bg-white p-4 shadow-md rounded-md">
							<h1 className="font-semibold text-3xl">Ulubione</h1>
							<p>cos tam potem</p>
						</div>
					</div>
				</div>
				{/* Przycisk Pokaż więcej */}
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
		</div>
	)
}
