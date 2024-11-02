"use client";
import React, { useState, useEffect } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import PredictionAnalysis from "@/components/predictionAnalysis";
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
const MenuCardList: React.FC<{ setAnalyzeResult: (data: any) => void }> = ({ setAnalyzeResult }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    setSelectedMenus((prev) => prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName]);
  };

  const handleAnalyzeClick = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
  
    try {
      const { data } = await axios.post(
        "http://192.168.77.90:5000/api/prediction/quantity",
        { menu: selectedMenus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Prediction data:", data);
  
      setAnalyzeResult(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError("Failed to fetch prediction data.");
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <Loader2 className="h-8 w-8 animate-spin text-blue-600" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Available Menus</h2>
          <p className="text-muted-foreground">Select the menus you'd like to analyze</p>
        </div>
        {selectedMenus.length > 0 && <span>{selectedMenus.length} selected</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menus.map((menu) => (
          <MenuCard key={menu.menu_id} menu={menu} selected={selectedMenus.includes(menu.nama)} onSelect={handleSelectMenu} />
        ))}
      </div>

      <button onClick={handleAnalyzeClick} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
        Analyze
      </button>
    </div>
  );
};

export default function Menu() {
  const [analyzeResult, setAnalyzeResult] = useState(null);

  return (
    <SidebarProvider style={{ "--sidebar-width": "19rem" } as React.CSSProperties}>
      <AppSidebar />
      <SidebarInset className="bg-gradient-to-t from-primary/10 to-background min-h-screen">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <MenuCardList setAnalyzeResult={setAnalyzeResult} />
          {analyzeResult && <PredictionAnalysis predictions={analyzeResult} />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
