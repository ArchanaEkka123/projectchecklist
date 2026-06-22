// app/api/checklist/route.js

import dbConnect from "@/lib/mongodb";
import Checklist from "@/models/Checklist";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const data = await Checklist.create(body);

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error,
    });
  }
}