import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order";
import Sample from '@/models/samples'

export async function POST(req) {
  const { samples1, orderIdDB, grandTotal1, currency1 } = await req.json();

  try {
    await dbConnect();

    // Define default values for new samples
    const defaultValues = {
      qualityCheckStatus: "isPending",
      qualityCheckReportLink: "",
      libraryPrepStatus: "isPending",
      libraryCheckReportLink: "",
      analysisSpecificationStatus: "isPending",
      analysisSpecificationReportLink: ""
    };

    // Separate existing and new samples
    const existingSamples = samples1.filter(sample => sample._id);
    const newSamples = samples1.filter(sample => !sample._id);

    // Update existing samples with orderId
    await Promise.all(
      existingSamples.map(async (sampleData) => {
        const sample = await Sample.findByIdAndUpdate(
          sampleData._id, // Find the sample by ID
          { 
            $set: { 
              ...sampleData, // Existing sample data
              orderId: orderIdDB // Add orderId to the update
            } 
          }, 
          { new: true } // Return the updated document
        );
        if (!sample) {
          throw new Error(`Sample with ID ${sampleData._id} not found`);
        }
      })
    );

    // Create new samples and get their IDs
    const savedNewSamples = await Promise.all(
      newSamples.map(async (sampleData) => {
        const sampleWithDefaults = { 
          ...defaultValues, 
          ...sampleData,
          orderId: orderIdDB // Add orderId to the new sample
        };
        const sample = new Sample(sampleWithDefaults);
        return sample.save();
      })
    );

    const sampleIds = [
      ...existingSamples.map(sample => sample._id),
      ...savedNewSamples.map(sample => sample._id)
    ]; // Combine existing and new sample IDs

    // Find the order by ID and update it
    const updatedOrder = await Order.findByIdAndUpdate(
      orderIdDB, // Find the order by ID
      { 
        $set: { 
          samples1: sampleIds, // Update the samples field with the new sample IDs
          grandTotal1: grandTotal1, // Update the grandTotal field
          currency1:currency1
        } 
      },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return new NextResponse(
        JSON.stringify({ error: "Order not found" }),
        {
          status: 404,
        }
      );
    }

    console.log("Order updated successfully:", updatedOrder);
    return new NextResponse(
      JSON.stringify({ message: "Order updated successfully", updatedOrder }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error updating order:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error updating order" }),
      {
        status: 500,
      }
    );
  }
}
