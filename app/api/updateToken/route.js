import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import mongoose from 'mongoose';

export async function POST(req) {
  const { userId, token } = await req.json();

  try {
    // Ensure userId is a valid ObjectId format
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return new NextResponse(
    //     JSON.stringify({ error: "Invalid userId format" }),
    //     { status: 400 }
    //   );
    // }

    await dbConnect();

    // Use the userId from the request
    const updatedUser = await User.findByIdAndUpdate(
      userId,  // Use the userId passed in the request
      { $set: { token } },
      { new: true }
    );
    console.log("updated user",updatedUser)
    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    console.log("User token updated successfully:", updatedUser);
    return new NextResponse(
      JSON.stringify({ message: "User token updated successfully", updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user token:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error updating user token" }),
      { status: 500 }
    );
  }
}
