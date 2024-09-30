import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order";
import User from "../../../models/user";
import { Currency } from "lucide-react";

export async function POST(req) {
  const { userId } = await req.json();
  try {
    console.log("userid", userId);
    await dbConnect();

    // Get the latest order and generate a new incremental orderId
    const latestOrder = await Order.findOne().sort({ createdAt: -1 }).exec();
    const nextOrderIdNumber = latestOrder
      ? parseInt(latestOrder.orderId.replace("ORDER", "")) + 1
      : 1;
    const nextOrderId = `ORDER${nextOrderIdNumber.toString().padStart(6, "0")}`;

    // Create a new order with default values
    const newOrder = await Order.create({
      userId: userId,
      orderId: nextOrderId,
      orderTitle: "Order",
      requestSheetStatus: "inUserProgress",
      requestSheetLink: "",
      costEstimateStatus: "isPending",
      costEstimationLink: "",
      formalRequestStatus: "isPending",
      sampleShippingStatus: "isPending",
      sampleShipping:"",
      qualityCheckStatus: "isPending",
      qualityCheckReportLink: "",
      libraryPrepStatus: "isPending",
      libraryCheckReportLink: "",
      analysisProgressStatus: "isPending",
      analysisDoneStatus: "isPending",
      analysisRawDataStatus: "isPending",
      rawDataLink: "",
      analysisSpecificationStatus: "isPending",
      analysisSpecificationReportLink: "",
      invoiceStatus: "isPending",
      invoiceLink: "",
      paymentStatus: "isPending",
      paymentRecieptLink: "",
      grandTotal: "",
      grandTotal1: "",
      currency: "",
      currency1: "",
      samples1: [],
      samples: []
    });

  
    console.log(newOrder)
    // Add the new order to the user's orders array
    await User.updateOne(
      { _id: userId },
      { $push: { orders: newOrder._id } }
    );

    console.log("result", newOrder);
    return new NextResponse(
      JSON.stringify({ message: "Order created successfully", data: newOrder }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
    return new NextResponse(
      JSON.stringify({ error: "Error creating order" }),
      {
        status: 500,
      }
    );
  }
}
