interface Meal {
	idMeal: number
	strMeal: string
	strMealThumb: string
}

interface Props {
	meals: Meal[]
	favouriteMeals: number[]
}

export default function FavouriteList({ meals, favouriteMeals }: Props) {
	return (
		<div className="bg-white p-4 shadow-md rounded-md md:w-3/5 mx-auto">
			<h1 className="font-semibold text-3xl">Favourites</h1>
			<ul>
				{meals
					.filter(({ idMeal }) => favouriteMeals.includes(idMeal))
					.map(({ idMeal, strMeal, strMealThumb }) => (
						<div>
							<li key={idMeal} className="flex items-center gap-2 mt-4">
								<img src={strMealThumb} alt={strMeal} className="w-12 h-12 rounded-full" />
								<p className="text-2xl font-semibold">{strMeal}</p>
							</li>
							<hr className="my-3 border-gray-300" />
						</div>
					))}
			</ul>
		</div>
	)
}
