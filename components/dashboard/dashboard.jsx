"use client";
import { useEffect, useState } from "react";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
  
export default function Dashboard() {
 const mmuList = [
  "Raipur MMU01",
  "Raipur MMU02",
  "Raipur MMU03",
  "Raipur MMU04",
  "Raipur MMU05",
  "Durg MMU01",
  "Durg MMU02",
  "Bilaspur MMU01",
];
  
   const downloadExcel = async () => {
    const res = await fetch("/api/checklist/export");
    const records = await res.json();
  
    const workbook = XLSX.utils.book_new();
  
    const excelData = [];
  
    records.forEach((record) => {
      record.equipment.forEach((item) => {
        excelData.push({
          "MMU Name": record.mmuName,
          "Inspection Date": record.inspectionDate,
          "Vehicle No": record.vehicleNo,
          "Location": record.location,
          "APM Name": record.apmName,
          "Doctor Name": record.doctorName,
          "Nodal Officer": record.nodalOfficer,
  
          "Instrument Name": item.instrumentName,
          "Assigned Qty": item.assignedQty,
          "Available Qty": item.availableQty,
          "Operational Qty": item.operationalQty,
          "Penalty Qty": item.penaltyQty,
          "Remarks": item.remarks,
        });
      });
    });
  
    const worksheet = XLSX.utils.json_to_sheet(excelData);
  
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Checklist Data"
    );
  
    XLSX.writeFile(
      workbook,
      `Checklist_Report_${Date.now()}.xlsx`
    );
  };









  
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Welcome to Equipment Checklist Management System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total Checklists
              </p>
              <h2 className="text-3xl font-bold">
                120
              </h2>
            </div>

            <ClipboardList
              size={40}
              className="text-orange-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Completed
              </p>
              <h2 className="text-3xl font-bold text-green-600">
                95
              </h2>
            </div>

            <CheckCircle
              size={40}
              className="text-green-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Pending
              </p>
              <h2 className="text-3xl font-bold text-red-600">
                25
              </h2>
            </div>

            <Clock
              size={40}
              className="text-red-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total MMU
              </p>
              <h2 className="text-3xl font-bold text-blue-600">
                18
              </h2>
            </div>

            <Users
              size={40}
              className="text-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Recent Records */}
      <div className="bg-white rounded-lg shadow mt-8 p-5">

        <h2 className="text-xl font-semibold mb-4">
          Recent Checklist Records
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3 text-left">
                  MMU Name
                </th>
                <th className="p-3 text-left">
                  Location
                </th>
                <th className="p-3 text-left">
                  Inspection Date
                </th>
                <th className="p-3 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-3">
                  MMU-001
                </td>
                <td className="p-3">
                  Raipur
                </td>
                <td className="p-3">
                  30-05-2026
                </td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded">
                    Completed
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-3">
                  MMU-002
                </td>
                <td className="p-3">
                  Bilaspur
                </td>
                <td className="p-3">
                  29-05-2026
                </td>
                <td className="p-3">
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded">
                    Pending
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-3">
                  MMU-003
                </td>
                <td className="p-3">
                  Durg
                </td>
                <td className="p-3">
                  28-05-2026
                </td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
{/* <select
  name="mmuName"
  value={formData.mmuName}
  onChange={handleChange}
  className="border p-3 rounded"
>
  <option value="">Select MMU</option>

  {mmuList.map((mmu, index) => (
    <option key={index} value={mmu}>
      {mmu}
    </option>
  ))}


</select> */}

        {/* <input
          type="date"
          name="inspectionDate"
          value={formData.inspectionDate}
          onChange={handleChange}
          className="border p-3 rounded"
        /> */}

<button
          onClick={downloadExcel}
          className="bg-green-600 text-white px-10 py-3 rounded"
        >
          Download 
        </button>

    </div>
  );
}