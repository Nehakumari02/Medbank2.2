import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order";

export async function POST(req) {
  try {
    const { page = 1, limit = 10, searchQuery = '' } = await req.json();
    console.log(page, limit, searchQuery);

    await dbConnect();

    const skip = (page - 1) * limit;
    const searchRegex = searchQuery ? new RegExp(searchQuery, 'i') : /.*/;

    // Fetch orders with pagination and search
    const orders = await Order.find({
      paymentStatus: 'isCompleted',
      $or: [
        { orderTitle: { $regex: searchRegex } },
        // Add more fields if you need to search in additional fields
      ]
    })
      .populate({
        path: 'userId',
        select: 'school Username' // Select only the fields you want from the User model
      })
      .skip(skip)
      .limit(limit)

    // Fetch total count of orders for pagination info
    const totalOrders = await Order.countDocuments({
      paymentStatus: 'isCompleted',
      $or: [
        { orderTitle: { $regex: searchRegex } },
      ]
    }).exec();

    console.log(orders)

    const flattenedOrders = orders.map(order => {
      const { userId, ...orderData } = order.toObject(); // Convert mongoose document to plain object
      return {
        ...orderData,
        Username: userId?.Username || '', // Directly include user data
        school: userId?.school|| '', // Assuming 'affiliation' was meant to be 'school'
      };
    });

    if (!flattenedOrders || flattenedOrders.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No Orders found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Orders fetched successfully",
        data: flattenedOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page
      }),
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
