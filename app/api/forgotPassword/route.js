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
    email,
    language
  } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables
      pass: process.env.EMAIL_PASS,
    },
  });

      // Generate a JWT for email verification
      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '240h' });
      const url = `${process.env.BASE_URL}/${language === 'jn' ? 'jn' : 'en'}/ResetPassword?token=${verificationToken}`;
  

  // Email content based on language
  const subject = language === 'jn' ? 'パスワードリセットのリクエスト' : 'Password Reset Request';
  const text = language === 'jn'
    ? `パスワードリセットのリクエストを受け取りました。\n\n以下のリンクをクリックしてパスワードをリセットしてください。\n\nリセットリンク: ${url}`
    : `We received a request to reset your password.\n\nPlease click the link below to reset your password:\n\nReset Link: ${url}`;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use your email user here
    to: email,
    subject: subject,
    text: text, // Use text instead of html
  };

  try {
    await dbConnect();
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return new NextResponse(JSON.stringify({ message: 'User does not exist' }), {
        status: 400,
      });
    }
    await transporter.sendMail(mailOptions);
    return new NextResponse(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.log("error",error)
    return new NextResponse(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
    });
  }
}
