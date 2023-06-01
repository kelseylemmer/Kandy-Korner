import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../tickets/LocationsList.js"
import { ProductsList } from "../tickets/ProductsList.js"


export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner Candy Shop</h1>
					<div>Yum</div>

					<Outlet />
				</>
			}>

				<Route path="locations" element={<LocationsList />} />
				<Route path="products" element={<ProductsList />} />


			</Route>
		</Routes>
	)
}