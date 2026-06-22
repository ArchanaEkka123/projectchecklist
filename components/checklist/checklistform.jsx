// app/checklist/page.jsx

"use client";

import { useEffect, useState } from "react";
import "./checklistform.scss";
import * as XLSX from "xlsx";
export default function Checklist() {
  const [formData, setFormData] = useState({
    mmuName: "Raipur MMU01,Raipur MMU01",
    inspectionDate: "",
    vehicleNo: "",
    apmName: "",
    doctorName: "",
    nodalOfficer: "",
    location: "",
  });

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
  const initialEquipment = [
    {
      instrumentName: "12 Lead ECG Machine",
      assignedQty: 1,
      availableQty: 1,
      operationalQty: 1,
      penaltyQty: 0,
      remarks: "",
      image: "",
    },
    {
      instrumentName: "AC Fan",
      assignedQty: 1,
      availableQty: 1,
      operationalQty: 1,
      penaltyQty: 0,
      remarks: "",
      image: "",
    },
    {
      instrumentName: "Ambu bag",
      assignedQty: 1,
      availableQty: 1,
      operationalQty: 1,
      penaltyQty: 0,
      remarks: "",
      image: "",
    },
    {
      instrumentName: "Auto scope",
      assignedQty: 1,
      availableQty: 1,
      operationalQty: 1,
      penaltyQty: 0,
      remarks: "",
      image: "",
    },
  ];
  const [equipment, setEquipment] = useState(initialEquipment);


  // Handle Header Inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Table Inputs
  const handleEquipmentChange = (index, field, value) => {
    const updated = [...equipment];

    updated[index][field] = Number(value);

    //Auto calculate Penalty Qty
    const assigned = Number(updated[index].assignedQty || 0);
    const available = Number(updated[index].availableQty || 0);

    updated[index].penaltyQty = assigned - available;

    setEquipment(updated);


    // const assigned = Number(updated[index].assignedQty || 0);
    // const available = Number(updated[index].availableQty || 0);
    // const operational = Number(updated[index].operationalQty || 0);

    // const availablePenalty = assigned - available;
    // const operationalPenalty = assigned - operational;

    // updated[index].penaltyQty = Math.max(
    //   0,
    //   availablePenalty,
    //   operationalPenalty
    // );


  };
  // Upload Image
  const handleImage = async (e, index) => {
    const file = e.target.files[0];

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    handleEquipmentChange(index, "image", data.filePath);
  };

  // Submit
  const handleSubmit = async () => {
    const res = await fetch("/api/checklist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        equipment,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Checklist Saved");

      // Reset form
      setFormData({
        mmuName: "",
        inspectionDate: "",
        vehicleNo: "",
        apmName: "",
        doctorName: "",
        nodalOfficer: "",
        location: "",
      });

      // Reset equipment table
      setEquipment(
        initialEquipment.map((item) => ({
          ...item,
        }))
      );
    }
  };
  // DownloadExcel
  const downloadExcel = async () => {
    if (!formData.mmuName || !formData.inspectionDate) {
      alert("Please select MMU and Inspection Date");
      return;

    }

    const res = await fetch(
      `/api/checklist/export?mmuName=${encodeURIComponent(
        formData.mmuName
      )}&inspectionDate=${formData.inspectionDate}`
    );

    const records = await res.json();
    console.log("Records =>", records);

    if (!records.length) {
      alert("No records found");
      return;
    }

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
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Checklist Data"
    );

    XLSX.writeFile(
      workbook,
      `${formData.mmuName}_${formData.inspectionDate}.xlsx`
    );
  };
  return (
    <div className=" checklist-main p-5 bg-gray-100 min-h-screen ">

      <div className="checklist-heading bg-orange-600 text-white p-5 text-xl font-bold">
        Capture Equipment Checklist Details
      </div>

      {/* Top Form */}
      <div className="grid md:grid-cols-2 gap-5 bg-white p-5">

        <select
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
        </select>

        <input
          type="date"
          name="inspectionDate"
          value={formData.inspectionDate}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="vehicleNo"
          placeholder="Vehicle Registration No"
          value={formData.vehicleNo}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="MMU Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="apmName"
          placeholder="APM Name"
          value={formData.apmName}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          value={formData.doctorName}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          type="text"
          name="nodalOfficer"
          placeholder="Nodal Officer Name"
          value={formData.nodalOfficer}
          onChange={handleChange}
          className="border p-3 rounded"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto mt-6">
        <table className="w-full border border-gray-300 bg-white">

          <thead className="bg-slate-300">
            <tr>
              <th className="border p-3">Sr No.</th>
              <th className="border p-3">Instrument Name</th>
              <th className="border p-3">Assigned Qty.</th>
              <th className="border p-3">Available Qty.</th>
              <th className="border p-3">Operational Qty.</th>
              <th className="border p-3">Penalty Qty.</th>
              <th className="border p-3">Upload</th>
              <th className="border p-3">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {equipment.map((item, index) => (
              <tr key={index}>

                <td className="border p-3">
                  {index + 1}
                </td>

                <td className="border p-3">
                  {item.instrumentName}
                </td>

                <td className="border p-3">
                  <input
                    type="number"
                    value={item.assignedQty}
                    readOnly
                    className="border p-2 w-24 bg-gray-100"

                  />
                </td>

                <td className="border p-3">
                  <input
                    type="number"
                    value={item.availableQty}
                    onChange={(e) =>
                      handleEquipmentChange(
                        index,
                        "availableQty",
                        e.target.value
                      )
                    }
                    className="border p-2 w-24"
                  />
                </td>

                <td className="border p-3">
                  <input
                    type="number"
                    value={item.operationalQty}
                    onChange={(e) =>
                      handleEquipmentChange(
                        index,
                        "operationalQty",
                        e.target.value
                      )
                    }
                    className="border p-2 w-24"
                  />
                </td>

                <td className="border p-3">
                  <input
                    type="number"
                    value={item.penaltyQty}
                    readOnly
                    className="border p-2 w-24 bg-gray-100"
                  />
                </td>

                <td className="border p-3">
                  <input
                    type="file"
                    onChange={(e) =>
                      handleImage(e, index)

                    }
                    className="border p-2 w-24 bg-gray-100"
                  />
                </td>

                <td className="border p-3">
                  <textarea

                    onChange={(e) =>
                      handleEquipmentChange(
                        index,
                        "remarks",
                        e.target.value
                      )
                    }
                    className="border p-2"
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-orange-600 text-white w-40 px-1 py-3 rounded"
      >
        Submit
      </button>
      {/* Reports */}
      <div className="flex gap-4 mt-6 w-full border border-gray-300 bg-white ">

        <div className="grid md:grid-cols-2 gap-5 bg-white p-5">

          <select
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
          </select>

          <input
            type="date"
            name="inspectionDate"
            value={formData.inspectionDate}
            onChange={handleChange}
          />
          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-1 w-40 py-3 rounded" >
            Download
          </button>
        </div>

      </div>
    </div>
  );
}