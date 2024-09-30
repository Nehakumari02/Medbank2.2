import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/user";

export async function POST(req) {
  const { email,password } = await req.json();
  console.log("email",email,"\n","password",password)
  try {
    
    return new NextResponse(JSON.stringify({ message: 'User sigin successfull' }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error signing in' }), {
      status: 500,
    });
  }
}
