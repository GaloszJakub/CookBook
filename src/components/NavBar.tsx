import { FaSearch } from 'react-icons/fa'

export default function NavBar() {
	return (
		<nav className="relative flex flex-col items-center justify-center h-[25vh] bg-cover bg-center bg-[url(./assets/navbarimg1.jpg)]">
			<div className="absolute inset-0 bg-black opacity-60 sm:opacity-20 z-0"></div>

			<label className="absolute top-10 z-10 flex items-center w-[270px] sm:w-[400px] px-4 py-2 bg-white rounded-full shadow-md cursor-text transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 ">
				<input type="text" placeholder="Search Recipes" className="flex-1 bg-transparent outline-none" />
				<FaSearch className="ml-2 text-gray-500 cursor-pointer" />
			</label>
			<h1 className="mt-20 sm:text-black text-white text-4xl z-10 font-serif font-semibold tracking-wide">
				Explore Recipes
			</h1>
		</nav>
	)
}
