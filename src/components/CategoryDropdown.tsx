import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

interface Category {
	idCategory: string
	strCategory: string
}

interface Props {
	categories: Category[]
	selectedCategory: string
	filterMealsByCategory: (category: string) => void
}

export default function CategoryDropdown({ categories, selectedCategory, filterMealsByCategory }: Props) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="relative w-full max-w-xs mx-auto">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex justify-between items-center bg-white shadow-md px-4 py-2 rounded-lg text-gray-700 font-medium transition hover:bg-gray-100">
				{selectedCategory || 'Select a category'}
				{isOpen ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="absolute w-full bg-white shadow-md mt-2 rounded-lg overflow-hidden z-10">
						<li
							onClick={() => {
								filterMealsByCategory('')
								setIsOpen(false)
							}}
							className="px-4 py-2 cursor-pointer hover:bg-gray-100">
							Wszystkie
						</li>
						{categories.map(category => (
							<li
								key={category.idCategory}
								onClick={() => {
									filterMealsByCategory(category.strCategory)
									setIsOpen(false)
								}}
								className="px-4 py-2 cursor-pointer hover:bg-gray-100">
								{category.strCategory}
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
