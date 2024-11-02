"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

interface Bahan {
	bahan_id: number
	nama: string
}

const BahanPage = () => {
	const [bahan, setBahan] = useState<Bahan[]>([])
	const [showAddForm, setShowAddForm] = useState(false)
	const [namaBahan, setNamaBahan] = useState("")

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) {
			const fetchData = async () => {
				try {
					const response = await axios.get<Bahan[]>(
						"http://192.168.77.90:5000/api/bahan",
						{
							headers: {
								Authorization: `Bearer ${token}`
							}
						}
					)
					setBahan(response.data.reverse())
				} catch (error) {
					console.error("Error fetching protected data:", error)
				}
			}

			fetchData()
		}
	}, [])

	const handleSubmit = async () => {
		const token = localStorage.getItem("token")

		if (!token) {
			return
		}

		if (!namaBahan) {
			return
		}
		const { data } = await axios.post(
			"http://192.168.77.90:5000/api/bahan",
			{
				nama: namaBahan
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
		const newBahanId = data.bahan_id

		const newBahan: Bahan[] = [
			{ bahan_id: newBahanId, nama: namaBahan },
			...bahan
		]
		setBahan(newBahan)
		setNamaBahan("")
	}

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "19rem"
				} as React.CSSProperties
			}>
			<AppSidebar />
			<SidebarInset className="bg-gradient-to-t from-primary/10 to-background min-h-screen">
				<header className="flex h-16 shrink-0 items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="max-w-3xl mx-auto p-6">
          <h2 className="text-3xl font-bold mb-4">Manage Ingredients</h2>
          <p className="text-lg text-gray-600 mb-6">
            Keep your ingredient inventory up-to-date by viewing, adding, and managing all items used in menu preparation. This helps maintain accuracy in ingredient quantities and costs, ensuring efficient inventory management.
          </p>
        </div>
					<div className="flex justify-center">
						<div className="w-1/2 pt-8">
							{!showAddForm ? (
								<div className="flex justify-end">
									<Button
										className="mb-4"
										onClick={() => {
											setShowAddForm((prev) => !prev)
										}}>
										Add Bahan
									</Button>
								</div>
							) : null}

							<div>
								{showAddForm ? (
									<form
										className="mb-8"
										onSubmit={(e) => {
											e.preventDefault()
											handleSubmit()
											console.log("here")
										}}>
										<Label className="block" htmlFor="bahan">
											Nama Bahan
										</Label>
										<input
											id="bahan"
											type="text"
											className="border-slate-400 border-[1px] rounded-sm block px-2"
											value={namaBahan}
											onChange={(e) => {
												setNamaBahan(e.target.value)
											}}
										/>

										<div className="flex justify-end mt-4 gap-4">
											<Button
												className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
												type="button"
												onClick={() => {
													setShowAddForm((prev) => !prev)
													setNamaBahan("")
												}}>
												Cancel
											</Button>
											<Button type="submit">Submit</Button>
										</div>

										<div className="w-full h-[1px] bg-slate-400 my-4"></div>
									</form>
								) : null}
							</div>

							<ul className="flex flex-wrap gap-4">
								{bahan?.map((b) => {
									return (
										<li
											key={b.bahan_id}
											className="border-[1px] border-black p-2 rounded-md w-[calc(50%-8px)]">
											{b.nama}
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}

export default BahanPage
