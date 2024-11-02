"use client";
import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import axios from "axios";

const sampleData = [
  {
    id: 1,
    name: "Burger",
    ingredients: [
      { name: "Lettuce", quantity: 20 },
      { name: "Beef", quantity: 20 },
    ],
    cost: 12000,
  },
  {
    id: 2,
    name: "Pasta",
    ingredients: [
      { name: "Pasta", quantity: 100 },
      { name: "Tomato Sauce", quantity: 50 },
      { name: "Cheese", quantity: 10 },
    ],
    cost: 18000,
  },
];

type Menu = {
  menu_id: number;
  nama: string;
  harga: number;
  berat: number;
  bahan: Bahan[];
};

type Bahan = {
  bahan_id: number;
  nama: string;
  kuantitas: number;
};

export function ManageMenu() {
<<<<<<< HEAD
  // This is to ensure that the component only renders on the client side.
  const [isMounted, setIsMounted] = React.useState(false);
  const [menus, setMenus] = useState<Menu[]>([]);
=======
	const [isMounted, setIsMounted] = React.useState(false)
>>>>>>> 060cafebf8b4f3c8a8d86c06b8d87ffbd1e116de

  React.useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const { data } = await axios.get<Menu[]>("http://192.168.77.90:5000/api/menu/withIngredients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

<<<<<<< HEAD
      setMenus(data);
    };
    fetchData();
=======
	if (!isMounted) return null
>>>>>>> 060cafebf8b4f3c8a8d86c06b8d87ffbd1e116de

    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent server-side rendering content

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Manage Menu</h2>
      <p className="text-lg text-gray-600 mb-6">View and manage menu items, including ingredient details and costs.</p>

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
              className="hover:bg-gray-50 cursor-pointer"
            >
              <TableCell>{menu.nama}</TableCell>
              <TableCell>{menu.bahan.length}</TableCell>
              <Accordion
                type="single"
                collapsible
              >
                <AccordionItem value={menu.nama}>
                  <AccordionTrigger>
                    <TableCell>Rp.{menu.harga.toLocaleString("id-ID")},00</TableCell>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-6 mt-2">
                      <h3 className="text-lg font-semibold">Ingredients:</h3>
                      <ul className="list-disc list-inside mt-2">
                        {menu.bahan.map((ingredient, i) => (
                          <li
                            key={i}
                            className="text-gray-700"
                          >
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
  );
}
