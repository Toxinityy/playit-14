"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent
} from "@/components/ui/accordion"
import {
	Table,
	TableHead,
	TableHeader,
	TableRow,
	TableCell,
	TableBody
} from "@/components/ui/table"
import axios from "axios"

type Menu = {
	menu_id: number
	nama: string
	harga: number
	berat: number
	bahan: Bahan[]
}

type Bahan = {
	bahan_id: number
	nama: string
	kuantitas: number
}

export function ManageMenu() {
	const router = useRouter()
	const [isMounted, setIsMounted] = React.useState(false)
	const [menus, setMenus] = useState<Menu[]>([])

	React.useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("token")
			if (!token) {
				return
			}
			const { data } = await axios.get<Menu[]>(
				"http://192.168.77.90:5000/api/menu/withIngredients",
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)

			setMenus(data)
		}
		fetchData()

		setIsMounted(true)
	}, [])

	if (!isMounted) return null // Prevent server-side rendering content

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Manage Menu</h2>
			<div className="flex justify-between items-center mb-6">
				<p className="text-lg text-gray-600">
					View and manage menu items, including ingredient details and costs.
				</p>
				<button
					onClick={() => router.push("/menu/add")}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
					Add New Menu Item
				</button>
			</div>

			<Table className="bg-white shadow-lg rounded-lg w-full">
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Count of Ingredients</TableHead>
						<TableHead>Cost (per menu)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{menus.map((menu) => (
						<TableRow
							key={menu.menu_id}
							className="hover:bg-gray-50 cursor-pointer">
							<TableCell>{menu.nama}</TableCell>
							<TableCell>{menu.bahan.length}</TableCell>
							<Accordion type="single" collapsible>
								<AccordionItem value={menu.nama}>
									<AccordionTrigger>
										<TableCell>
											Rp.{menu.harga.toLocaleString("id-ID")},00
										</TableCell>
									</AccordionTrigger>
									<AccordionContent>
										<div className="ml-6 mt-2">
											<h3 className="text-lg font-semibold">Ingredients:</h3>
											<ul className="list-disc list-inside mt-2">
												{menu.bahan.map((ingredient, i) => (
													<li key={i} className="text-gray-700">
														{ingredient.nama}: {ingredient.kuantitas} grams
													</li>
												))}
											</ul>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
