import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order";
import User from "../../../models/user";

export async function POST(req) {
  const { userId } = await req.json();
  try {
    console.log("Fetching orders for userId:", userId);
    await dbConnect();

    // Find the user and populate their orders array
    const user = await User.findById(userId).populate('orders').exec();
    // console.log(user)

    if (!user || !user.orders || user.orders.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No orders found for this user" }),
        { status: 404 }
      );
    }

    // console.log("Orders found:", user.orders);
    return new NextResponse(
      JSON.stringify({ message: "Orders fetched successfully", data: user.orders }),
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
