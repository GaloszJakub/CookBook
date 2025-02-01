import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import MainPage from './components/MainPage'
import MealPage from './components/MealPage'
import Footer from './components/Footer'

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<NavBar />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/meal/:id" element={<MealPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	)
}

export default App
