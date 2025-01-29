type MealProps = {
	name: string
	image: string
	category: string
	area: string
}

export default function MealCard({ name, image, category, area }: MealProps) {
	return (
		<div className="bg-white p-4 relative shadow-md rounded-md w-[170px]">
			<div className="bg-[url{image}] w-[110px] h-[110px] bg-center bg-cover absolute top-[-30px] left-1/2 -translate-x-1/2 shadow-lg rounded-xl"></div>

			<h3 className="mt-20 text-center font-semibold">{name}</h3>
			<p className="text-center text-gray-500">{category}</p>
			<p className="text-center text-gray-500">{area}</p>

			<div className="flex justify-center gap-4 mt-2">
				<a href="#" className="text-blue-500">
					Ulubione
				</a>
				<p className="text-gray-500"> {image}</p>
			</div>
		</div>
	)
}
