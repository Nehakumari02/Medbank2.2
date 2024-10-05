import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

export async function POST(req) {
  const {password, language, token} = await req.json();
  console.log("token from passwored",token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables
      pass: process.env.EMAIL_PASS,
    },
  });

    // Prepare the confirmation email
    const subject = language === 'jn' ? 'パスワードが変更されました' : 'Password Changed';
    const text = language === 'jn'
      ? `あなたのパスワードが正常に変更されました。`
      : `Your password has been changed successfully.`;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use your email user here
    to: decoded.email,
    subject: subject,
    text: text, // Use text instead of html
  };

  try {
    await dbConnect();
    const email = decoded.email; // Extract email from token
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    user.password = hashedPassword;
    await user.save();
    await transporter.sendMail(mailOptions);

    return new NextResponse(JSON.stringify({ message: 'Password updated successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Error updating password' }), { status: 500 });
  }
}
