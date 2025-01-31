import { Tab, TabGroup, TabList } from '@headlessui/react'
import Cookies from 'cookies-ts'
import { useState, useEffect } from 'react'
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io'

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

	// Funkcja do dodawania/usuwania ulubionego posiłku
	const toggleFavourite = (id: number) => {
		setFavouriteMeals(
			prevFavourites =>
				prevFavourites.includes(id)
					? prevFavourites.filter(favId => favId !== id) // Usuwamy, jeśli już jest
					: [...prevFavourites, id] // Dodajemy, jeśli nie ma
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

	return (
		<div className="bg-[#f4f4f4]">
			<div className="container mx-auto p-4">
				<div className="flex justify-between items-center mb-10">
					<TabGroup>
						<TabList className="bg-white p-3 rounded-full space-x-5">
							<Tab
								onClick={() => filterMealsByCategory('')}
								className={`cursor-pointer data-[selected]:bg-[#c9c9c9] ${
									selectedCategory === '' ? 'bg-[#c9c9c9]' : ''
								}`}>
								Wszystkie
							</Tab>
							{categories.map(category => (
								<Tab
									key={category.idCategory}
									onClick={() => filterMealsByCategory(category.strCategory)}
									className={`cursor-pointer data-[selected]:bg-[#c9c9c9] ${
										selectedCategory === category.strCategory ? 'bg-[#c9c9c9]' : ''
									}`}>
									{category.strCategory}
								</Tab>
							))}
						</TabList>
					</TabGroup>
				</div>

				<div className="flex justify-between gap-6 mt-20">
					<div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-20">
						{filteredMeals.slice(0, visibleMealsCount).map(meal => (
							<div key={meal.idMeal} className="bg-white p-4 relative shadow-md rounded-md">
								<div
									className="bg-cover w-[200px] h-[170px] bg-center absolute top-[-30px] left-1/2 -translate-x-1/2 shadow-lg rounded-md"
									style={{ backgroundImage: `url(${meal.strMealThumb})` }}></div>
								<h3 className="mt-35 text-xl text-center font-semibold">{meal.strMeal}</h3>
								<p className="text-center text-gray-500">{meal.strCategory}</p>
								<p className="text-center text-gray-500">{meal.strArea}</p>
								<div className="flex justify-center gap-4 mt-2">
									<button onClick={() => toggleFavourite(meal.idMeal)} className="text-red-500 text-2xl">
										{favouriteMeals.includes(meal.idMeal) ? <IoMdHeart /> : <IoIosHeartEmpty />}
									</button>
									<p className="text-gray-600">Szczegóły</p>
								</div>
							</div>
						))}
					</div>

					<div className="w-1/4">
						<div className="bg-white p-4 shadow-md rounded-md">
							<h1 className="font-semibold text-xl">Ostatnio oglądane</h1>
							<p>cos tam potem</p>
						</div>
					</div>
				</div>

				{filteredMeals.length > visibleMealsCount && (
					<div className="flex mt-4">
						<button
							onClick={showMoreMeals}
							className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer">
							Pokaż więcej
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
