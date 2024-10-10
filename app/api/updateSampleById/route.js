import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Sample from "@/models/samples"; // Import the Sample model

export async function POST(req) {
  const { orderData, sampleIdDB } = await req.json(); // Destructure the sample data and sample ID
  console.log(orderData,sampleIdDB)
  try {
    await dbConnect();

    // Update a single sample by its unique ID and return the updated document
    const result = await Sample.findByIdAndUpdate(
      sampleIdDB, // Filter by the unique sample ID
      {
        $set: orderData, // Update the sample with the new data
      },
      { new: true } // Return the updated document
    );

    console.log(result);

    if (result.modifiedCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No sample found for the given ID" }),
        {
          status: 404,
        }
      );
    }

    console.log("Sample updated successfully:", result);
    return new NextResponse(
      JSON.stringify({
        message: "Sample updated successfully",
        updatedCount: result.modifiedCount,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error updating sample:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error updating sample" }),
      {
        status: 500,
      }
    );
  }
}
