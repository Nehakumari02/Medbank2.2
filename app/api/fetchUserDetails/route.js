import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  
  const { userId } = await req.json();
  console.log(userId)

  await dbConnect();

  try {
    const user = await User.findOne({_id:userId});
    if (user) {
      console.log("sucessssssssss")
      return new NextResponse(JSON.stringify({ message: 'Details fetched successfully',user }), {
        status: 200,
      });
    }
    res.status(400).json("no user found");
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Unable to fetch user detail' }), {
      status: 500,
    });
  }
}
