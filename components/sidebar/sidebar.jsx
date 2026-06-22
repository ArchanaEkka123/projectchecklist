"use client";

import "./sidebar.scss";
import Link from "next/link";
//import Dashboard from "@/components/dashboard/dashboard";
//import ChecklistPage from "../checklist/checklistform";
import Navbar from "@/components/navbar/Navbar";
import {
  LayoutDashboard,
  UserPlus,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="Sidebar-main w-[230px] min-h-screen bg-[#f15a18] text-white">
      
      {/* Logo */}
      {/* <div className="flex justify-center py-4 bg-[#f15a18]">
        <img
          src="/images/Ekka-Logo.jpg"
          alt="logo"
          className="w-[90px] h-[90px] object-contain"
        />
      </div> */}

      {/* Search */}
      <div className="SearchBox-main">
        <input
          type="text"
          placeholder="Search..."
          className="SearchBox px-6 py-2 rounded w-50 text-black"
        />
      </div>

      {/* Menu Heading */}
      <div className="menu uppercase border-b border-orange-300">
        Menu
      </div>

      {/* Menu Items */}
      <div className="Menu-Items">

        {/* Dashboard */}
                 

        <Link href="/dashboard">
          <div className="flex items-center justify-between px-4 py-4 border-b border-orange-300 hover:bg-orange-600 cursor-pointer transition">
            <div className="sidemenu flex items-center gap-3">
              <LayoutDashboard size={20} />
              <span className="text-[18px]">Dashboard</span>
            </div>

            <ChevronRight size={18} />
          </div>
        </Link>

        {/* Checklist */}
        <Link href="/checklist">
          <div className="flex items-center justify-between px-4 py-4 border-b border-orange-300 hover:bg-orange-600 cursor-pointer transition">
            <div className="sidemenu flex items-center gap-3">
              <UserPlus size={20} />
              <span className="text-[18px]">Checklist</span>
            </div>

            <ChevronRight size={18} />
          </div>
        </Link>

        {/* Report */}
<Link href="/report">
          <div className="flex items-center justify-between px-4 py-4 border-b border-orange-300 hover:bg-orange-600 cursor-pointer transition">
            <div className="sidemenu flex items-center gap-3">
              <UserPlus size={20} />
              <span className="text-[18px]">Report</span>
            </div>

            <ChevronRight size={18} />
          </div>
        </Link>
      </div>
    </div>
  );
}