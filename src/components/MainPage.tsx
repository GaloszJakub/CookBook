import { Tab, TabGroup, TabList, Select } from '@headlessui/react'
import { useEffect, useState } from 'react'
/*import MealCard from './MealCard'*/

type Meal ={
	strName: string;
	strCategory: string;
	strArea: string;
	strImg: string;
}

export default function MainPage() {

	const [meals, setMeals] = useState<Meal[]>([]);
	useEffect(() => {
		const fetchMeals = async () =>{
			const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
			const data = await response.json();
			setMeals(data.meals)
		}
		fetchMeals();
	}, [] );
	return (
		<div className="bg-[#dddddd] border-t-3 border-[#cacaca] ">
			<div className="container  mx-auto p-4 border">
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
				<div className="flex items-center justify-around mt-20">
					<div>
						<div>
						<div className="bg-white p-4 relative shadow-md rounded-md w-[170px]">
			<div className="bg-[url{image}] w-[110px] h-[110px] bg-center bg-cover absolute top-[-30px] left-1/2 -translate-x-1/2 shadow-lg rounded-xl"></div>

			<h3 className="mt-20 text-center font-semibold">siema</h3>
			<p className="text-center text-gray-500">s2</p>
			<p className="text-center text-gray-500">s3</p>

			<div className="flex justify-center gap-4 mt-2">
				<a href="#" className="text-blue-500">
					Ulubione
				</a>
				<p className="text-gray-600"> s4</p>
			</div>
		</div>
						</div>
					</div>
					<div>
						<div>
							<div className="bg-white p-5">
								<h3 className="mb-5">Ostatnio oglodane</h3>
								<div className="flex items-center gap-4">
									<div className="bg-[url(./assets/navbarimg1.jpg)] w-[40px] h-[40px] bg-center bg-cover rounded-full"></div>
									<div>
										<h3 className="font-bold text-md">nazwa</h3>
										<p className="text-sm">jakis opis czy cos</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
