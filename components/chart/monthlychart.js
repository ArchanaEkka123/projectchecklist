"use client";

import { useEffect, useState } from "react";
import "./monthlychart.scss";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

export default function MonthlyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await fetch("/api/dashboard/monthly");
    const json = await res.json();
    setData(json);
  }

  const colors = [
    "#f97316",
    "#22c55e",
    "#3b82f6",
    "#eab308",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f59e0b",
    "#6366f1",
  ];

  return (
    <div className="bg-blue rounded-lg shadow-lg p-6 mt-8">
      <h2 className=" chart-heading text-xl font-bold mb-5 pl-6 text-gray-700">
        Monthly Checklist Submission
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="submissions"
            name="Submissions"
            radius={[8, 8, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}