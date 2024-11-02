// components/PredictionAnalysis.tsx
"use client";

import React from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody
} from "@/components/ui/table";

const PredictionAnalysis: React.FC<{ predictions: { name: string; portion: number }[] }> = ({ predictions = [] }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Prediction Results</h2>
      <p className="text-muted-foreground">Portion predictions in grams</p>
      
      {predictions.length > 0 ? (
        <Table className="bg-white shadow-lg rounded-lg w-full mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Portion Prediction (grams)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {predictions.map((prediction, index) => (
              <TableRow key={index}>
                <TableCell>{prediction.name}</TableCell>
                <TableCell>{prediction.portion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No predictions available</p>
      )}
    </div>
  );
};

export default PredictionAnalysis;
