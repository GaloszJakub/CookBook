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
		<div className="bg-white p-4 shadow-md rounded-md">
			<h1 className="font-semibold text-3xl">Ulubione</h1>
			<ul>
				{meals
					.filter(({ idMeal }) => favouriteMeals.includes(idMeal))
					.map(({ idMeal, strMeal, strMealThumb }) => (
						<li key={idMeal} className="flex items-center gap-2 mt-4">
							<img src={strMealThumb} alt={strMeal} className="w-12 h-12 rounded-full" />
							<p>{strMeal}</p>
						</li>
					))}
			</ul>
		</div>
	)
}
