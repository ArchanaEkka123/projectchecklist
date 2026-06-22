import Image from "next/image";
import ChecklistPage from "@/components/checklist/checklistform";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/sidebar";
import "./page.scss";
import Dashboard from "@/components/dashboard/dashboard";
import "./globals.scss";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          

          <main className="flex-1 min-h-screen bg-gray-100">
             <Dashboard/>

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}