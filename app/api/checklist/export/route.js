import connectDB from "@/lib/mongodb";
import Checklist from "@/models/Checklist";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const mmuName = searchParams.get("mmuName");
  const inspectionDate = searchParams.get("inspectionDate");

  const query = {};

  if (mmuName) query.mmuName = mmuName;
  if (inspectionDate) query.inspectionDate = inspectionDate;

  const records = await Checklist.find(query).lean();

  return Response.json(records);
}