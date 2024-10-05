import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token'); // Get the token from the URL
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await dbConnect();

  try {
    const user = await User.findOne({ email:decoded.email }); // Find user by token
    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Invalid token' }), { status: 400 });
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = null; // Clear the token
    await user.save();
    console.log("User verified")

    return new NextResponse(JSON.stringify({ message: 'Email verified successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Error verifying email' }), { status: 500 });
  }
}
