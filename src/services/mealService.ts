interface Meal {
	idMeal: number
	strMeal: string
	strMealThumb: string
	strCategory: string
	strArea: string
}

interface Category {
	strCategory: string
}

export const fetchMeals = async (): Promise<Meal[]> => {
	try {
		// 1. Pobierz wszystkie kategorie
		const categoryResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
		const categoryData = await categoryResponse.json()

		if (!categoryData.categories) return []

		// 2. Pobierz ID dań z każdej kategorii
		const mealPromises = categoryData.categories.map(async (category: Category) => {
			const mealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
			const mealsData = await mealsResponse.json()
			return mealsData.meals || []
		})

		// 3. Pobieramy listę ID wszystkich dań
		const mealsByCategory = await Promise.all(mealPromises)
		const mealIDs = mealsByCategory.flat().map(meal => meal.idMeal)

		// 4. Pobieramy pełne dane dla każdego dania (równolegle)
		const detailedMealPromises = mealIDs.map(async (id: number) => {
			const mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
			const mealData = await mealResponse.json()
			return mealData.meals ? mealData.meals[0] : null
		})

		// 5. Czekamy na odpowiedzi i filtrujemy `null`
		const allMeals = (await Promise.all(detailedMealPromises)).filter((meal): meal is Meal => meal !== null)

		// 6. Sortowanie alfabetyczne po nazwie dania (strMeal)
		allMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal))

		return allMeals
	} catch (error) {
		console.error('Błąd podczas pobierania dań:', error)
		return []
	}
}

interface Category {
	idCategory: string;
	strCategory: string;
  }
  
  export const fetchCategories = async (): Promise<Category[]> => {
	try {
	  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
	  const data = await response.json();
	  // Mapowanie zwróconych kategorii do interfejsu Category
	  const categories: Category[] = data.categories.map((cat: any) => ({
		idCategory: cat.idCategory,
		strCategory: cat.strCategory,
	  }));
	  return categories;
	} catch (error) {
	  console.error('Błąd podczas pobierania kategorii:', error);
	  return [];
	}
  };