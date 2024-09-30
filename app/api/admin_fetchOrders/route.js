import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order";

export async function POST(req) {
  try {
    const {page,limit,searchQuery} = await req.json();
    console.log(page,limit)
    await dbConnect();

    const skip = (page- 1) * limit;
    const searchRegex = searchQuery ? new RegExp(searchQuery, 'i') : /.*/;

    // Fetch orders with pagination
    const orders = await Order.find({ 
      $or: [
        { orderTitle: { $regex: searchRegex } },
        // Add more fields if you need to search in additional fields
      ]
    })
      .populate({
        path: 'userId',
        select: 'school Username' // Select only the fields you want from the User model
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Fetch total count of orders for pagination info
    const totalOrders = await Order.countDocuments({ 
      $or: [
        { orderTitle: { $regex: searchRegex } },
      ]
    });

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
