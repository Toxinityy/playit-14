"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Seperator } from "@/components/ui/seperator";
import { Heading3 } from "lucide-react";

interface Menu {
  menu_id: number;
  nama: string;
  harga: number;
}

interface MenuWithPorsi {
  nama: string;
  menu_id: number;
  porsi: number;
}

const RecapPage = () => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<{ menu_id: number; nama: string }>();
  const [porsi, setPorsi] = useState(1);
  const [alreadyFill, setAlreadyFill] = useState<boolean>();
  const [waste, setWaste] = useState<string>();
  const [clientWaste, setClientWaste] = useState<string>();

  const [enteredMenu, setEnteredMenu] = useState<MenuWithPorsi[]>([]);

  const handleClientWasteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientWaste(e.target.value);
  };

  useEffect(() => {
    const fetchAlreadyFill = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        const { data } = await axios.get(`http://192.168.77.90:5000/api/preparation?date=${formattedDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.menu.length === 0 || !data.waste) {
          setAlreadyFill(false);
        } else {
          setEnteredMenu(data.menu);
          setWaste(data.waste);
          setAlreadyFill(true);
        }
      }
    };
    fetchAlreadyFill();

    if (alreadyFill) {
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = await axios.get<Menu[]>("http://192.168.77.90:5000/api/menu", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMenu(data);
        setSelectedMenu({ menu_id: data[0].menu_id, nama: data[0].nama });
      }
    };
    fetchData();
  }, []);

  const handleMenuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArr = e.target.value.split(";");
    const selectedMenuId = selectedArr[0];
    const selectedMenuName = selectedArr[1];

    setSelectedMenu({ menu_id: Number(selectedMenuId), nama: selectedMenuName });
  };

  const handleSubmitClick = async () => {
    const exists = enteredMenu.some((item) => item.menu_id === selectedMenu?.menu_id);

    if (!exists) {
      const newEnteredMenu = [{ ...selectedMenu!, porsi }, ...enteredMenu];
      setEnteredMenu(newEnteredMenu);
    }
  };

  const handlePorsiChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPorsi(Number(e.target.value));
  };

  const handleSaveClick = async () => {
    const processedMenu = enteredMenu.map((m) => {
      return {
        menu_id: m.menu_id,
        porsi: m.porsi,
      };
    });

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const { data } = await axios.post<{ preparation_id: number }>(
      "http://192.168.77.90:5000/api/preparation",
      {
        menu: processedMenu,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAlreadyFill(true);
  };
  return (
    <main className="flex justify-center py-8">
      <div className="w-1/2">
        <h1 className="text-3xl mb-2">Today&apos;s Menu recap</h1>
        <p className="text-slate-400">Menus that is served today</p>

        <Seperator />

        <div>
          {!alreadyFill ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitClick();
              }}
            >
              <h2 className="block text-xl">Enter new menu</h2>

              <Label>Menu : </Label>
              <select
                name="menu"
                id="menu"
                className="text-lg border-[1px] border-slate-400 rounded-md px-2 py-1 mt-2"
                onChange={(e) => {
                  handleMenuChange(e);
                }}
              >
                {menu.map((m) => {
                  return (
                    <option
                      value={`${m.menu_id};${m.nama}`}
                      key={m.menu_id}
                    >
                      {m.nama}
                    </option>
                  );
                })}
              </select>

              <br />
              <div>
                <Label>Porsi : </Label>
                <input
                  type="number"
                  className="border-slate-400 border-[1px] rounded-sm px-2 w-20 mt-2"
                  defaultValue={1}
                  min={1}
                  onChange={(e) => {
                    handlePorsiChange(e);
                  }}
                />
              </div>

              <Button
                type="submit"
                className="mt-4"
              >
                Add
              </Button>
            </form>
          ) : null}
        </div>

        <ul className="mt-4 flex flex-col gap-4">
          {enteredMenu.map((em) => {
            return (
              <li
                key={em.menu_id}
                className="border-slate-400 border-[1px] p-4 rounded-md flex gap-2"
              >
                <p>{em.nama}</p>
                <p>x{em.porsi}</p>
              </li>
            );
          })}
        </ul>

        <div className="flex justify-end mt-6">
          {!alreadyFill ? (
            <Button
              onClick={(e) => {
                handleSaveClick();
              }}
            >
              Save
            </Button>
          ) : null}
        </div>

        <Seperator />

        <h2 className="text-3xl mb-2">Today&apos;s Waste</h2>
        <p className="text-slate-400">Wasted food for today</p>

        {!waste ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setWaste(clientWaste);
              const token = localStorage.getItem("token");
              if (!token) return;
              await axios.post(
                "http://192.168.77.90:5000/api/waste",
                {
                  food_in_gr: clientWaste,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            }}
          >
            <div>
              <Label>Waste(gram) : </Label>
              <input
                type="number"
                className="border-slate-400 border-[1px] rounded-sm px-2 w-20 mt-2"
                defaultValue={1}
                min={1}
                onChange={(e) => {
                  handleClientWasteChange(e);
                }}
                value={clientWaste}
              />
            </div>

            <Button
              type="submit"
              className="mt-4"
            >
              Save
            </Button>
          </form>
        ) : (
          <h3>{`Food Wasted (gram) : ${waste}`}</h3>
        )}
      </div>
    </main>
  );
};

export default RecapPage;
