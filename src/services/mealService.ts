export const fetchMeals = async () => {
	try {
		const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
		const data = await response.json()
		return data.meals || []
	} catch (error) {
		console.error('Błąd podczas pobierania posiłków:', error)
		return []
	}
}

export const fetchCategories = async () => {
	try {
		const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
		const data = await response.json()
		return data.categories || []
	} catch (error) {
		console.error('Błąd podczas pobierania kategorii:', error)
		return []
	}
}
