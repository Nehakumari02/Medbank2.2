import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order";

export async function POST(req) {
  try {
    const { userId, page, limit, searchQuery } = await req.json();
    console.log(page, limit);

    await dbConnect();

    const skip = (page - 1) * limit;
    const searchRegex = searchQuery ? new RegExp(searchQuery, 'i') : /.*/;

    // Fetch orders with pagination, filtering by invoiceStatus and populating user
    const orders = await Order.find({ 
      $and: [
        { invoiceStatus: "isCompleted" },
        { userId: userId},
        {
          $or: [
            { orderTitle: { $regex: searchRegex } }
            // Add more fields if you need to search in additional fields
          ]
        }
      ]
    })
      .populate({
        path: 'userId',
        select: 'school Username' // Select only the fields you want from the User model
      })
      .select('orderId orderTitle grandTotal1 paymentStatus') // Select only the fields you want from the Order model
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

      const flattenedOrders = orders.map(order => {
        const { userId, ...orderData } = order.toObject(); // Convert mongoose document to plain object
        return {
          ...orderData,
          Username: userId?.Username || '', // Directly include user data
          school: userId?.school|| '', // Assuming 'affiliation' was meant to be 'school'
        };
      });


      console.log("Payment payments",orders)
    // Fetch total count of orders for pagination info
    const totalOrders = await Order.countDocuments({ 
      $and: [
        { invoiceStatus: "isCompleted" },
        {
          $or: [
            { orderTitle: { $regex: searchRegex } }
            // Add more fields if you need to search in additional fields
          ]
        }
      ]
    });

    if (!flattenedOrders || flattenedOrders.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No Payment found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Payment fetched successfully",
        data: flattenedOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching Payment:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching Payment" }),
      { status: 500 }
    );
  }
}
