import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email,password,admin } = await req.json();
  console.log("email",email,"\n","password",password,"\n","admin",admin)

  try {
    await dbConnect();
    let user;
    if (admin) {
      user = await User.findOne({ email, role: "admin" });
    } else {
      user = await User.findOne({ email });
    }

    console.log(user);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    console.log("password match", passwordsMatch);

    if (!passwordsMatch) {
      console.log("error for passowrd is sent")
      return new NextResponse(JSON.stringify({ message: 'Password is incorrect' }), {
        status: 401,
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,  // Ensure that `JWT_SECRET` is set in your environment variables
      { expiresIn: "2h" } // Set token expiry time
    );

    // return new NextResponse(JSON.stringify({ message: 'User sigin successfull',userId:user._id }), {
    //   status: 200,
    // });

    return new NextResponse(JSON.stringify({ 
      message: 'User sign-in successful', 
      userId: user._id,
      token 
    }), {
      status: 200,
      headers: {
        "Set-Cookie": `medbank_user_token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=7200` // Set cookie for 2 hours
      }
    });

  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error signing in' }), {
      status: 500,
    });
  }
}
