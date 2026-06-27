"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./sidebar.scss";
import Link from "next/link";
import Dashboard from "@/components/dashboard/dashboard";
import ChecklistPage from "../checklist/checklistform";
import Navbar from "@/components/navbar/Navbar";
import {
  LayoutDashboard,
  UserPlus,
  ChevronRight,
   Search,
} from "lucide-react";

export default function Sidebar() {
 const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const value = search.trim().toLowerCase();

    if (value === "dashboard") {
      router.push("/dashboard");
    } else if (value === "checklist") {
      router.push("/checklist");
    } else if (value === "report") {
      router.push("/report");
    } else {
      alert("Page not found");
    }
  }

  return (
    <div className="Sidebar-main w-[230px] min-h-screen bg-[#f15a18] text-white">
            
      {/* Search */}
      <div className="SearchBox-main flex items-center gap-2 pl-10">
  <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {  
        handleSearch();
      }
    }}
    className="SearchBox  rounded w-full text-black"
  />

  <button
    onClick={handleSearch}
    className="bg-white p-2 rounded text-orange-600 hover:bg-gray-200"
  >
    {/* <Search size={18} /> */}
  </button>
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