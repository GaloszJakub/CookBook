import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io'

interface Meal {
	idMeal: number
	strMeal: string
	strMealThumb: string
	strCategory: string
	strArea: string
}

interface Props {
	meal: Meal
	isFavourite: boolean
	toggleFavourite: (id: number) => void
}

export default function MealCard({ meal, isFavourite, toggleFavourite }: Props) {
	return (
		<div className="bg-white p-4 relative shadow-md rounded-md w-max mx-auto px-20 sm:w-full sm:px-4">
			<div
				className="bg-cover w-[200px] h-[170px] bg-center absolute top-[-30px] left-1/2 -translate-x-1/2 shadow-lg rounded-md"
				style={{ backgroundImage: `url(${meal.strMealThumb})` }}
			></div>
			<h3 className="mt-35 text-xl text-center font-semibold">{meal.strMeal}</h3>
			<p className="text-center text-gray-500">{meal.strCategory}</p>
			<p className="text-center text-gray-500">{meal.strArea}</p>
			<div className="flex justify-around gap-4 mt-2">
				<button
					onClick={() => toggleFavourite(meal.idMeal)}
					className="text-red-500 text-2xl cursor-pointer hover:scale-150 scale-130 duration-300">
					{isFavourite ? <IoMdHeart /> : <IoIosHeartEmpty />}
				</button>
				<p className=" bg-blue-500 px-2 py-1 rounded-full font-semibold tracking-wide cursor-pointer hover:scale-105 duration-300 text-white w-full text-center">
					Sprawdź!
				</p>
			</div>
		</div>
	)
}
