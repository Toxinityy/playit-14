// components/AddMenuForm.tsx
"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"

interface Ingredient {
	bahan_id: number
	nama: string
}

interface SelectedIngredient extends Ingredient {
	grams: number
}

const AddMenuForm = () => {
	const [menuName, setMenuName] = useState("")
	const [ingredients, setIngredients] = useState<Ingredient[]>([])
	const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([])
	const [cost, setCost] = useState<number>(0)

	// Fetch ingredients from API
	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) {
			const fetchData = async () => {
				try {
					const response = await axios.get<Ingredient[]>(
						"http://192.168.77.90:5000/api/bahan",
						{
							headers: {
								Authorization: `Bearer ${token}`
							}
						}
					)
					setIngredients(response.data.reverse())
				} catch (error) {
					console.error("Error fetching protected data:", error)
				}
			}

			fetchData()
		}
	}, [])

	const handleIngredientSelect = (ingredient: Ingredient) => {
		if (!selectedIngredients.some((item) => item.bahan_id === ingredient.bahan_id)) {
			setSelectedIngredients([
				...selectedIngredients,
				{ ...ingredient, grams: 0 }
			])
		}
	}

	const handleGramsChange = (id: number, grams: number) => {
		setSelectedIngredients(
			selectedIngredients.map((ingredient) =>
				ingredient.bahan_id === id ? { ...ingredient, grams } : ingredient
			)
		)
	}

	const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const token = localStorage.getItem("token")

        const payload = {
            nama: menuName, // Use menuName as the "nama" field
            harga: cost, // Use cost as the "harga" field
            berat: 10, // Berat value
            bahan: selectedIngredients.map((ingredient) => ({
                bahan_id: ingredient.bahan_id, // Use bahan_id
                kuantitas: ingredient.grams // Use grams as kuantitas
            }))
        }
        
        try {
            const response = await axios.post("http://192.168.77.90:5000/api/menu", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Menu added successfully:", response.data);
        } catch (error) {
            console.error("Error adding menu:", error);
        }
    
        // Reset the form
        setMenuName("")
        setSelectedIngredients([])  
        setCost(0)
    }
    

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<label
					htmlFor="menuName"
					className="block text-sm font-medium text-gray-700">
					Menu Name
				</label>
				<input
					type="text"
					id="menuName"
					value={menuName}
					onChange={(e) => setMenuName(e.target.value)}
					className="w-full px-3 py-2 border rounded-md"
					placeholder="Enter menu name"
					required
				/>
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700">
					Ingredients
				</label>
				<select
					onChange={(e) => {
						const selectedId = parseInt(e.target.value)
						const ingredient = ingredients.find((ing) => ing.bahan_id === selectedId)
						if (ingredient) handleIngredientSelect(ingredient)
					}}
					className="w-full px-3 py-2 border rounded-md">
					<option key="default" value="">
						Select ingredient
					</option>
					{ingredients.length ? (
						ingredients.map((ingredient) => (
							<option key={`ingredient-${ingredient.bahan_id}`} value={ingredient.bahan_id}>
								{ingredient.nama}
							</option>
						))
					) : (
						<option>Loading ingredients...</option>
					)}
				</select>

				{selectedIngredients.map((ingredient) => {
					return (
						<div
							key={`selected-${ingredient.bahan_id}`}
							className="flex items-center gap-2">
							<span className="text-sm text-gray-700">{ingredient.nama}:</span>
							<input
								type="number"
								value={ingredient.grams}
								onChange={(e) =>
									handleGramsChange(ingredient.bahan_id, parseInt(e.target.value))
								}
								className="w-24 px-2 py-1 border rounded-md"
								placeholder="Grams"
								required
							/>
                            <span className="text-sm text-gray-700"> grams</span>
						</div>
					)
				})}
			</div>

			<div className="space-y-2">
				<label
					htmlFor="cost"
					className="block text-sm font-medium text-gray-700">
					Cost per Menu (in Rupiah)
				</label>
				<input
					type="number"
					id="cost"
					value={cost}
					onChange={(e) => setCost(parseInt(e.target.value))}
					className="w-full px-3 py-2 border rounded-md"
					placeholder="Enter cost"
					required
				/>
			</div>

			<button
				type="submit"
				className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
				Add Menu
			</button>
		</form>
	)
}

export default AddMenuForm
