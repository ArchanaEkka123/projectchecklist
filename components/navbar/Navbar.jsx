"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import "./navbar.scss";
export default function Navbar() {
  return (
    <nav className="  h-[85px] bg-[#e85d04] flex items-center  px-6 relative overflow-hidden">
      
           
      <div className=" nav-logo flex items-center gap-6">
          <img
          src="/images/Ekka-Logo.jpg"
          alt="logo"
          className="w-[70px] h-[70px] object-contain"
        />

        {/* Menu Icon */}
       
      </div>

      {/* Center Heading */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        
        <h1 className="text-white text-[20px] md:text-[32px] font-bold">
            WellCome To Elite
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="">
          {/* <Image
            src="/images/Ekka-Logo.jpg"
            alt="modi"
            width={70}
            height={70}
          /> */}
                    
        </div>

        {/* <div className="text-white text-sm font-semibold whitespace-nowrap">
          WELCOME : Love pangania , <span>State Officer</span>
        </div> */}
      </div>
    </nav>
  );
}