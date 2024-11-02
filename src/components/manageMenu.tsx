"use client"
import React from "react"
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

const sampleData = [
	{
        id: 1,
		name: "Burger",
		ingredients: [
			{ name: "Lettuce", quantity: 20 },
			{ name: "Beef", quantity: 20 }
		],
		cost: 12000
	},
	{
        id: 2,
		name: "Pasta",
		ingredients: [
			{ name: "Pasta", quantity: 100 },
			{ name: "Tomato Sauce", quantity: 50 },
			{ name: "Cheese", quantity: 10 }
		],
		cost: 18000
	}
]

export function ManageMenu() {
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Manage Menu</h2>
			<p className="text-lg text-gray-600 mb-6">
				View and manage menu items, including ingredient details and costs.
			</p>

			<Table className="bg-white shadow-lg rounded-lg w-full">
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Count of Ingredients</TableHead>
						<TableHead>Cost (per menu)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sampleData.map((menu) => (
						<TableRow key={menu.id}  className="hover:bg-gray-50 cursor-pointer">
							<TableCell>{menu.name}</TableCell>
							<TableCell>{menu.ingredients.length}</TableCell>
							<Accordion type="single" collapsible>
								<AccordionItem value={menu.name}>
									<AccordionTrigger>
										<TableCell>
											Rp.{menu.cost.toLocaleString("id-ID")},00
										</TableCell>
									</AccordionTrigger>
									<AccordionContent>
										<div className="ml-6 mt-2">
											<h3 className="text-lg font-semibold">Ingredients:</h3>
											<ul className="list-disc list-inside mt-2">
												{menu.ingredients.map((ingredient, i) => (
													<li key={i} className="text-gray-700">
														{ingredient.name}: {ingredient.quantity} grams
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
