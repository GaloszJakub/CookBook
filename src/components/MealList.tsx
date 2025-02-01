import MealCard from './MealCard'

interface Meal {
	idMeal: number
	strMeal: string
	strMealThumb: string
	strCategory: string
	strArea: string
}

interface Props {
	meals: Meal[]
	visibleMealsCount: number
	favouriteMeals: number[]
	toggleFavourite: (id: number) => void
}

export default function MealList({ meals, visibleMealsCount, favouriteMeals, toggleFavourite }: Props) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-10 gap-y-20">
			{meals.slice(0, visibleMealsCount).map(meal => (
				<MealCard
					key={meal.idMeal}
					meal={meal}
					isFavourite={favouriteMeals.includes(meal.idMeal)}
					toggleFavourite={toggleFavourite}
				/>
			))}
		</div>
	)
}
