import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Checklist from "@/models/Checklist";

export async function GET() {
  await dbConnect();

  const today = new Date();

  // Today
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  // Month
  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  // Year
  const startOfYear = new Date(
    today.getFullYear(),
    0,
    1
  );

  const [
    todayCount,
    monthCount,
    yearCount,
    totalCount
  ] = await Promise.all([
    Checklist.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),

    Checklist.countDocuments({
      createdAt: {
        $gte: startOfMonth,
      },
    }),

    Checklist.countDocuments({
      createdAt: {
        $gte: startOfYear,
      },
    }),

    Checklist.countDocuments(),
  ]);

  return NextResponse.json({
    todayCount,
    monthCount,
    yearCount,
    totalCount,
  });
}