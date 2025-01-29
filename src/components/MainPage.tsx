import { Tab, TabGroup, TabList, Select } from '@headlessui/react'
import Cookies from 'cookies-ts'
import { useState, useEffect } from 'react'

// Definicja typu Meal, odpowiadająca strukturze danych z API
interface Meal {
	idMeal: number
	strMeal: string
	strMealThumb: string
	strCategory: string
	strArea: string
}

const cookies = new Cookies()



export default function MainPage() {
	// Typowanie stanu jako array Meal
	const [meals, setMeals] = useState<Meal[]>([])
	const [favouriteMeal, setFavouriteMeal] = useState<number[]>([]);
	useEffect(() => {
		cookies.set("favouriteMeals", JSON.stringify(favouriteMeal), { expires: 365 }); // Zapis na 7 dni
	  }, [favouriteMeal]);
	
	const addFavourite = (id:number) => {
		setFavouriteMeal((prevFavorites =>[...prevFavorites, id]));
	
	}
	// Pobieranie danych z API przy renderowaniu komponentu
	useEffect(() => {
		const fetchMeals = async () => {
			try {
				const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
				const data = await response.json()

				// Ustawiamy dane do stanu (np. 9 pierwszych posiłków)
				if (data.meals) {
					setMeals(data.meals.slice(0, 9)) // Pobieramy tylko pierwsze 9 posiłków
				}
			} catch (error) {
				console.error('Error fetching meals:', error)
			}
		}

		fetchMeals()
	}, []) // Tylko raz przy renderowaniu

	return (
		<div className="bg-[#dddddd] border-t-3 border-[#cacaca] ">
			<div className="container mx-auto p-4 border">
				<div className="flex justify-around items-center">
					<div>
						<TabGroup>
							<TabList className="bg-white p-3 rounded-full space-x-5">
								<Tab className="data-[selected]:bg-[#c9c9c9] data-[selected]:text-[#d45454] data-[selected]:font-bold data-[selected]:p-1 data-[selected]:rounded-full data-[selected]:border-1 data-[selected]:border-[#8d8d8d] data-[hover]:underline cursor-pointer">
									Tab 1
								</Tab>
							</TabList>
						</TabGroup>
					</div>
					<div>
						<Select
							name="status"
							className="border data-[hover]:shadow data-[focus]:bg-blue-100"
							aria-label="Project status">
							<option value="active">Active</option>
							<option value="paused">Paused</option>
							<option value="delayed">Delayed</option>
							<option value="canceled">Canceled</option>
						</Select>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">
					{/* Generowanie kart na podstawie danych z API */}
					{meals.map(meal => (
						<div key={meal.idMeal} className="bg-white p-4 relative shadow-md rounded-md w-full">
							{/* Obrazek */}
							<div
								className="bg-cover w-[110px] h-[110px] bg-center absolute top-[-30px] left-1/2 -translate-x-1/2 shadow-lg rounded-xl"
								style={{ backgroundImage: `url(${meal.strMealThumb})` }}></div>
							{/* Nazwa posiłku */}
							<h3 className="mt-20 text-center font-semibold">{meal.strMeal}</h3>
							{/* Kategoria */}
							<p className="text-center text-gray-500">{meal.strCategory}</p>
							{/* Kraj */}
							<p className="text-center text-gray-500">{meal.strArea}</p>

							<div className="flex justify-center gap-4 mt-2">
								<a href="#" className="text-blue-500" onClick={ () => addFavourite(meal.idMeal)}>
									Ulubione
								</a>
								<p className="text-gray-600">Szczegóły</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
