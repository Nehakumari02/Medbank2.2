import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Sample from "@/models/samples"; // Import the Sample model

export async function POST(req) {
  const { sample, orderId } = await req.json(); // Destructure the sample data and orderId

  try {
    await dbConnect();

    // Update all samples where orderId matches
    const result = await Sample.updateMany(
      { orderId }, // Filter by orderId
      {
        $set: sample, // Update the sample with the new data
      },
      { new: true }
    );

    console.log(result)

    if (result.nModified === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No samples found for the given orderId" }),
        {
          status: 404,
        }
      );
    }

    console.log("Samples updated successfully:", result);
    return new NextResponse(
      JSON.stringify({ message: "Samples updated successfully", updatedCount: result.nModified }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error updating samples:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error updating samples" }),
      {
        status: 500,
      }
    );
  }
}
