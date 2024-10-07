import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/user";
import Conversation from "../../../models/conversation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

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
    language
  } = await req.json();
  console.log("name",name,"\n","email",email,"\n","password",password,"\n","confirmPassword",confirmPassword,language)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables
      pass: process.env.EMAIL_PASS,
    },
  });

      // Generate a JWT for email verification
      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '240h' }); // Expires in 1 hour
      const url = `${process.env.BASE_URL}/api/verify-email?token=${verificationToken}`;
  

  // Email content based on language\
  const subject = language === 'jn' ? '確認リンク' : 'Confirmation Link';
  // const text = language === 'jn'
  //   ? `以下のリンクをクリックして、登録を確認してください。\n\n登録確認: ${url}`
  //   : `Please click the link below to confirm your registration.\n\nConfirm Registration: ${url}`;
  const htmlContent = language === 'jn'
  ? `
    <p>こんにちは Medbank です。</p>
    <p>Mypage のご登録ありがとうございます。</p>
    <p>以下のリンクをクリックして、メールアドレスを認証してください。</p>
    <p><strong>メールアドレス認証：</strong><a href="${url}">${url}</a></p>
    <p>Medbank株式会社</p>
  `
  : `
    <p>Hello Medbank,</p>
    <p>Thank you for registering with Mypage.</p>
    <p>Please click the link below to confirm your registration.</p>
    <p><strong>Confirm Registration: </strong><a href="${url}">${url}</a></p>
    <p>Medbank Pte. Ltd</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use your email user here
    to: email,
    subject: subject,
    // text: text, // Use text instead of html
    html:htmlContent
  };

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
    await transporter.sendMail(mailOptions);
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
