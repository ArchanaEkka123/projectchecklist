"use client";
import "./StatsBarChart.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsBarChart({ stats }) {
  const data = {
    labels: [
      "Today",
      "Monthly",
      "Yearly",
      "Total",
    ],
  datasets: [
  {
    label: "Checklist Submission",
    data: [
      stats.todayCount,
      stats.monthCount,
      stats.yearCount,
      stats.totalCount,
    ],
    backgroundColor: [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
    ],
    //borderRadius: 8,

    // Reduce bar width
    barThickness: 50,      // Fixed width
    maxBarThickness: 55,   // Maximum width
    categoryPercentage: 0.5,
    barPercentage: 0.6,
  },
],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Checklist Submission Statistics",
      },
    },
  };

  return (
    <div className=" bar bg-white rounded-lg shadow p-6 mt-8">
      <Bar data={data} options={options} />
    </div>
  );
}