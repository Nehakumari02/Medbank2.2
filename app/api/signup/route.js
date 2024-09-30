import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/user";
import Conversation from "../../../models/conversation";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const {
    Username = "",
    name = "",
    school = "",
    faculty = "",
    field = "",
    others = "",
    service = "",
    country="",
    phone = "",
    email,
    confirmEmail,
    Perfecture = "",
    postalCode = "",
    city = "",
    password,
    confirmPassword,
  } = await req.json();
  console.log("name",name,"\n","email",email,"\n","password",password,"\n","confirmPassword",confirmPassword)
  try {
    await dbConnect();
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: 'User already registered' }), {
        status: 400,
      });
    }

    // Get the latest user and generate the next memberId
    const latestUser = await User.findOne().sort({ memberId: -1 }).exec();
    const nextMemberIdNumber = latestUser
      ? parseInt(latestUser.memberId.replace(/^0+/, "")) + 1
      : 1;
    const nextMemberId = nextMemberIdNumber.toString().padStart(4, "0"); // Adjust length as needed
      
    const hashedPassword = await bcrypt.hash(password, 10);
    

    const res = await User.create({
      Username,
      token:"",
      memberId:nextMemberId,
      name,
      school,
      faculty,
      field,
      others,
      service,
      country,
      phone,
      email,
      Perfecture,
      postalCode,
      city,
      password: hashedPassword,
    });
    console.log("result",res)

    // Create a conversation with the admin
    const adminId = new mongoose.Types.ObjectId("66e055de6ddc7825fbd8a103");
    const conversation = await Conversation.create({
      participants: [res._id, adminId],
    });

    console.log("New conversation created with admin:", conversation);
    return new NextResponse(JSON.stringify({ message: 'User registered successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.log("error",error)
    return new NextResponse(JSON.stringify({ error: 'Error registering user' }), {
      status: 500,
    });
  }
}
