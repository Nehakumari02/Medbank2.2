import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

export async function POST(req) {
  try {
    const { page, limit, searchQuery } = await req.json();
    console.log(page, limit);

    await dbConnect();

    const skip = (page - 1) * limit;
    const searchRegex = searchQuery ? new RegExp(searchQuery, 'i') : /.*/;

    // Fetch users with pagination
    const users = await User.find({ 
      $or: [
        { Username: { $regex: searchRegex } },
        // Add more fields if you need to search in additional fields
      ]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('memberId Username school country city'); // Modify as needed

    console.log("users for customers query", users)

    // Fetch total count of users for pagination info
    const totalUsers = await User.countDocuments({
      $or:[
        {Username: { $regex: searchRegex }}
      ]
    });

    if (!users || users.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No users found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Users fetched successfully",
        data: users,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching users:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching users" }),
      { status: 500 }
    );
  }
}
