import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order"; // Import Order model

export async function POST(req) {
  const { userId } = await req.json();

  try {
    console.log("Fetching completed orders for userId:", userId);
    await dbConnect();

    // Define the status for completed orders
    const isCompleted = 'Completed'; // Replace with the actual value used in your model

    // Fetch orders directly based on userId and paymentStatus
    const orders = await Order.find({ 
      userId: userId, 
      paymentStatus: "isCompleted" 
    }).exec();

    if (!orders || orders.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No completed orders found for this user" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Orders fetched successfully", data: orders }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching orders:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching orders" }),
      { status: 500 }
    );
  }
}
