// models/Checklist.js

import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema({
  instrumentName: String,
  assignedQty: Number,
  availableQty: Number,
  operationalQty: Number,
  penaltyQty: Number,
  remarks: String,
  image: String,
});

const ChecklistSchema = new mongoose.Schema(
  {
    mmuName: String,
    inspectionDate: String,
    vehicleNo: String,
    apmName: String,
    doctorName: String,
    nodalOfficer: String,
    location: String,

    equipment: [EquipmentSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Checklist ||
  mongoose.model("Checklist", ChecklistSchema);