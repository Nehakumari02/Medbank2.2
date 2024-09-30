import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order";

export async function POST(req) {
  const { order, orderIdDB } = await req.json();

  try {
    // console.log("Received Order Data:", order);
    await dbConnect();
    console.log(orderIdDB)
    // Find the order by _id (orderIdDB) and update it with the new data
    const updatedOrder = await Order.findByIdAndUpdate(
      orderIdDB,
      {
        $set: order, // Update the order with the new data
      },
      { new: true } // Return the updated document
    );
    console.log(updatedOrder)

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
