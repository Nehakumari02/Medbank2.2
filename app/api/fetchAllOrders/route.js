import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order";

export async function POST() {
  try {
    console.log("Fetching all orders");
    await dbConnect();

    // Find all orders in the database
    const orders = await Order.find({}).exec();

    if (!orders || orders.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No orders found" }),
        { status: 404 }
      );
    }

    // Return the fetched orders
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
