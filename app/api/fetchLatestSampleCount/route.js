import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Sample from '@/models/samples';

export async function POST() {
  try {
    await dbConnect(); // Ensure you're connected to the database

    // Count all the samples in the Sample collection
    const sampleCount = await Sample.countDocuments();

    return new NextResponse(
      JSON.stringify({ message: "Sample count retrieved successfully", sampleCount }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error retrieving sample count:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error retrieving sample count" }),
      {
        status: 500,
      }
    );
  }
}
