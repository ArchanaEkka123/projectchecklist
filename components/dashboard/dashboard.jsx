"use client";
import StatsBarChart from "@/components/chart/StatsBarChart";
import { useEffect, useState } from "react";
//import MonthlyChart from "@/components/chart/monthlychart";
import "./dashboard.scss";

export default function Dashboard() {

  const [stats, setStats] = useState({
    todayCount: 0,
    monthCount: 0,
    yearCount: 0,
    totalCount: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const res = await fetch("/api/dashboard");
    const data = await res.json();
    setStats(data);
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className=" dashboard-heading text-3xl font-bold mb-8">
        Checklist Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="total bg-blue shadow rounded p-6">
          <h2 className="">
            Today's Submission
          </h2>

          <p className="text-4xl font-bold text-blue-600">
            {stats.todayCount}
          </p>
        </div>

        <div className=" total bg-green shadow rounded p-6">
          <h2 className="">
            Monthly Submission
          </h2>

          <p className="text-4xl font-bold text-green-600">
            {stats.monthCount}
          </p>
        </div>

        <div className=" total bg-white shadow rounded p-6">
          <h2 className="">
            Yearly Submission
          </h2>

          <p className="text-4xl font-bold text-orange-600">
            {stats.yearCount}
          </p>
        </div>

        <div className="total bg-white shadow rounded p-6">
          <h2 className="">
            Total Submission
          </h2>

          <p className="text-4xl font-bold text-red-600">
            {stats.totalCount}
          </p>
        </div>

      </div>
 <StatsBarChart stats={stats} />
    </div>
  );
}