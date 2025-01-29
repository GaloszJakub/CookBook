import { Tab, TabGroup, TabList } from '@headlessui/react'
import { useState, useEffect } from 'react'

// Definicja typu Meal, odpowiadająca strukturze danych z API
interface Meal {
	idMeal: string
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

export default function MainPage() {
	// Typowanie stanu jako array Meal
	const [meals, setMeals] = useState<Meal[]>([])
	const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]) // Stany do filtrowanych posiłków
	const [categories, setCategories] = useState<Category[]>([]) // Stany do kategorii
	const [selectedCategory, setSelectedCategory] = useState<string>('') // Domyślnie pusta, oznacza wszystkie posiłki
	const [visibleMealsCount, setVisibleMealsCount] = useState<number>(8) // Maksymalna liczba wyświetlanych elementów

	// Pobieranie danych z API przy renderowaniu komponentu
	useEffect(() => {
		const fetchMeals = async () => {
			try {
				const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=') // Możesz dostosować do szukania wg kategorii
				const data = await response.json()

				// Ustawiamy dane do stanu (np. 9 pierwszych posiłków)
				if (data.meals) {
					setMeals(data.meals)
					setFilteredMeals(data.meals) // Na początku pokazujemy wszystkie posiłki
				}
			} catch (error) {
				console.error('Error fetching meals:', error)
			}
		}

		const fetchCategories = async () => {
			try {
				const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php') // Pobranie kategorii
				const data = await response.json()

				// Zbieramy wszystkie kategorie
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

	// Funkcja do filtrowania posiłków na podstawie wybranej kategorii
	const filterMealsByCategory = (category: string) => {
		setSelectedCategory(category) // Ustawiamy wybraną kategorię
		if (category === '') {
			setFilteredMeals(meals) // Jeśli kategoria nie jest wybrana, pokazujemy wszystkie posiłki
		} else {
			setFilteredMeals(meals.filter(meal => meal.strCategory === category))
		}
	}

	// Ustawienie domyślnie klikniętej kategorii "Wszystkie" po załadowaniu strony
	useEffect(() => {
		filterMealsByCategory('') // "Wszystkie" na początku
	}, [meals]) // Tylko gdy meals są załadowane, wykonaj filtrację

	// Funkcja do pokazywania większej liczby posiłków
	const showMoreMeals = () => {
		setVisibleMealsCount(prevCount => prevCount + 8) // Dodajemy 8 kolejnych elementów
	}

	return (
		<div className="bg-[#f4f4f4]">
			<div className="container mx-auto p-4">
				<div className="flex justify-between items-center mb-10">
					<div>
						<TabGroup>
							<TabList className="bg-white p-3 rounded-full space-x-5">
								{/* Dodajemy przycisk "Wszystkie" */}
								<Tab
									onClick={() => filterMealsByCategory('')} // Kliknięcie na "Wszystkie" - pokazuje wszystkie posiłki
									className={`data-[selected]:bg-[#c9c9c9] data-[selected]:text-[#d45454] data-[selected]:font-bold data-[selected]:p-1 data-[selected]:rounded-full data-[selected]:border-1 data-[selected]:border-[#8d8d8d] data-[hover]:underline cursor-pointer ${
										selectedCategory === '' ? 'bg-[#c9c9c9]' : ''
									}`}>
									Wszystkie
								</Tab>

								{/* Generujemy przyciski kategorii */}
								{categories.map(category => (
									<Tab
										key={category.idCategory}
										onClick={() => filterMealsByCategory(category.strCategory)}
										className={`data-[selected]:bg-[#c9c9c9] data-[selected]:text-[#d45454] data-[selected]:font-bold data-[selected]:p-1 data-[selected]:rounded-full data-[selected]:border-1 data-[selected]:border-[#8d8d8d] data-[hover]:underline cursor-pointer ${
											selectedCategory === category.strCategory ? 'bg-[#c9c9c9]' : ''
										}`}>
										{category.strCategory}
									</Tab>
								))}
							</TabList>
						</TabGroup>
					</div>
				</div>

				<div className="flex justify-between gap-6 mt-20">
					{/* Główny panel z kartami posiłków */}
					<div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-20">
						{/* Generowanie kart na podstawie danych z API */}
						{filteredMeals.slice(0, visibleMealsCount).map(meal => (
							<div key={meal.idMeal} className="bg-white p-4 relative shadow-md rounded-md">
								{/* Obrazek */}
								<div
									className="bg-cover w-[200px] h-[170px] bg-center absolute top-[-30px] left-1/2 -translate-x-1/2 shadow-lg rounded-md "
									style={{ backgroundImage: `url(${meal.strMealThumb})` }}></div>
								{/* Nazwa posiłku */}
								<h3 className="mt-35 text-xl text-center font-semibold">{meal.strMeal}</h3>
								{/* Kategoria */}
								<p className="text-center text-gray-500">{meal.strCategory}</p>
								{/* Kraj */}
								<p className="text-center text-gray-500">{meal.strArea}</p>

								<div className="flex justify-center gap-4 mt-2">
									<a href="#" className="text-blue-500">
										Ulubione
									</a>
									<p className="text-gray-600">Szczegóły</p>
								</div>
							</div>
						))}
					</div>

					{/* Panel "Ostatnio oglądane" po prawej stronie */}
					<div className="w-1/4">
						<div className="bg-white p-4 shadow-md rounded-md">
							<h1 className="font-semibold text-xl">Ostatnio oglądane</h1>
							<p>cos tam potem</p>
						</div>
					</div>
				</div>

				{/* Przycisk "Pokaż więcej" */}
				{filteredMeals.length > visibleMealsCount && (
					<div className="flex  mt-4  ">
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
