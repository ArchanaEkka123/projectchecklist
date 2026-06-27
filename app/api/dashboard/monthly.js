import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Checklist from "@/models/Checklist";

export async function GET() {
  await dbConnect();

  const year = new Date().getFullYear();

  const result = await Checklist.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lt: new Date(`${year + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id": 1,
      },
    },
  ]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = months.map((month, index) => ({
    month,
    submissions: 0,
  }));

  result.forEach((item) => {
    data[item._id - 1].submissions = item.total;
  });

  return NextResponse.json(data);
}