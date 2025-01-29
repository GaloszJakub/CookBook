import { Tab, TabGroup, TabList, Select } from '@headlessui/react'
import MealCard from './MealCard'
export default function MainPage() {
	return (
		<div className="bg-[#dddddd] border-t-3 border-[#cacaca] ">
			<div className="container  mx-auto p-4 border">
				<div className="flex justify-around items-center">
					<div>
						<TabGroup>
							<TabList className="bg-white p-3 rounded-full space-x-5">
								<Tab className="data-[selected]:bg-[#c9c9c9] data-[selected]:text-[#d45454] data-[selected]:font-bold data-[selected]:p-1 data-[selected]:rounded-full data-[selected]:border-1 data-[selected]:border-[#8d8d8d] data-[hover]:underline cursor-pointer">
									Tab 1
								</Tab>
							</TabList>
						</TabGroup>
					</div>
					<div>
						<Select
							name="status"
							className="border data-[hover]:shadow data-[focus]:bg-blue-100"
							aria-label="Project status">
							<option value="active">Active</option>
							<option value="paused">Paused</option>
							<option value="delayed">Delayed</option>
							<option value="canceled">Canceled</option>
						</Select>
					</div>
				</div>
				<div className="flex items-center justify-around mt-20">
					<div>
						<div>
							<MealCard name="siema" area='siem2' category='sie3' image='siem'/>
						</div>
					</div>
					<div>
						<div>
							<div className="bg-white p-5">
								<h3 className="mb-5">Ostatnio oglodane</h3>
								<div className="flex items-center gap-4">
									<div className="bg-[url(./assets/navbarimg1.jpg)] w-[40px] h-[40px] bg-center bg-cover rounded-full"></div>
									<div>
										<h3 className="font-bold text-md">nazwa</h3>
										<p className="text-sm">jakis opis czy cos</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
