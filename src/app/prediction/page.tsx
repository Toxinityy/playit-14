"use client";
import React, { useState, useEffect } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

interface Menu {
  menu_id: number;
  nama: string;
}

// MenuCard Component
const MenuCard: React.FC<{
  menu: Menu;
  selected: boolean;
  onSelect: (menuName: string) => void;
}> = ({ menu, selected, onSelect }) => {
  return (
    <Card
      className={cn("relative cursor-pointer transition-all hover:shadow-lg border-2", selected ? "border-blue-600 bg-blue-50" : "border-transparent hover:border-blue-200")}
      onClick={() => onSelect(menu.nama)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg mb-2">{menu.nama}</CardTitle>
          </div>
          {selected && (
            <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Category</span>
          <span className="text-xs">~60 mins</span>
        </div>
      </CardHeader>
    </Card>
  );
};

// Main MenuCardList Component
const MenuCardList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [analyzeResult, setAnalyzeResult] = useState();

  useEffect(() => {
    const fetchMenus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get<Menu[]>("http://192.168.77.90:5000/api/menu", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMenus(response.data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An unexpected error occurred");
        } finally {
          setLoading(false);
        }
      } else {
        setError("No authentication token found.");
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const handleSelectMenu = (menuName: string) => {
    setSelectedMenus((prev) => {
      if (prev.includes(menuName)) {
        return prev.filter((name) => name !== menuName);
      } else {
        return [...prev, menuName];
      }
    });
  };

  // Fetch dan cek selectedMenus disini
  const handleAnalyzeClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }
    const { data } = await axios.post(
      "http://192.168.77.90:5000/api/prediction/quantity",
      {
        menu: selectedMenus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAnalyzeResult(data);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500">Error loading menus:</p>
        <p className="text-red-700 font-semibold">{error}</p>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
          }}
          className="mt-4 text-blue-600 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Available Menus</h2>
          <p className="text-muted-foreground">Select the menus you'd like to analyze</p>
        </div>
        {selectedMenus.length > 0 && (
          <div className="text-sm text-blue-600">
            {selectedMenus.length} menu{selectedMenus.length !== 1 ? "s" : ""} selected
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menus.map((menu) => (
          <MenuCard
            key={menu.menu_id}
            menu={menu}
            selected={selectedMenus.includes(menu.nama)}
            onSelect={handleSelectMenu}
          />
        ))}
      </div>

      {/* Analyze Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleAnalyzeClick}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Analyze
        </button>
      </div>
    </div>
  );
};

export default function Menu() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <MenuCardList />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
