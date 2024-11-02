"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Menu {
  menu_id: number;
  nama: string;
  harga: number;
}

const PredictPage = () => {
  const [menu, setMenu] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = await axios.get<Menu[]>("http://192.168.77.90:5000/api/menu", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMenu(data);
      }
    };
    fetchData();
  }, []);

  return <div>{JSON.stringify(menu)}</div>;
};

export default PredictPage;
