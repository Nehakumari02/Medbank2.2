import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order";
import Sample from '@/models/samples'

export async function POST(req) {
  const { samples, orderIdDB, grandTotal, currency } = await req.json();

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

    // Create new samples and get their IDs
    const savedNewSamples = await Promise.all(
      samples.map(async (sampleData) => {
        const sampleWithDefaults = { 
          ...defaultValues, 
          ...sampleData,
          costEstimation_qualityFees: sampleData.qualityFees,
          costEstimation_libraryFees: sampleData.libraryFees,
          costEstimation_analysisFees: sampleData.analysisFees,
          costEstimation_tax: sampleData.tax,
          costEstimation_others: sampleData.others,
          costEstimation_total: sampleData.total,
          orderId: orderIdDB // Add orderId to the new sample
        };
        const sample = new Sample(sampleWithDefaults);
        return sample.save();
      })
    );

    const sampleIds = savedNewSamples.map(sample => sample._id); // Collect IDs of newly created samples

    // Find the order by ID and update it
    const updatedOrder = await Order.findByIdAndUpdate(
      orderIdDB, // Find the order by ID
      { 
        $set: { 
          samples: sampleIds, // Update the samples field with the new sample IDs
          grandTotal: grandTotal, // Update the grandTotal field
          currency:currency,
          samples1: sampleIds,
          grandTotal1: grandTotal,
          currency1: currency
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
