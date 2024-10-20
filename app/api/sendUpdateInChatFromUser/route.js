import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Conversation from "../../../models/conversation";
import Message from "../../../models/message";
import User from "../../../models/user";
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { adminIdDB, userId, message } = await req.json();

  try {
    await dbConnect();
    // Step 1: Fetch user email and name from the database using userId
    const user = await User.findById(adminIdDB);

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const {email } = user;
  
    // Find the conversation where userId is in participants
    const conversation = await Conversation.findOne({
      participants: userId
    });

    if (!conversation) {
      return new NextResponse(JSON.stringify({ error: 'Conversation not found' }), {
        status: 404,
      });
    }

    const conversationId = conversation._id;
    console.log(conversationId)

    // Create and save the new message
    const newMessage = new Message({
      conversationId,
      senderId: userId,
      text: message,
    });

    const res = await newMessage.save();
    console.log(res)

    // Update the last message in the conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: {
        text: message,
        senderId: userId,
        seen: false,
        lastMessageTs: Date.now()
      },
    });

    // Step 3: Handle sending the email
    const transporter = nodemailer.createTransport({
    host: "smtp.mail.us-east-1.awsapps.com",
    port: 465, // Use 465 for SSL or 587 for TLS
    secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "MEDBANK 【遺伝子解析について】Genetic Analysis",
      text: `Dear Admin 
      こんにちは。お客様からメッセージが届きました。
      Hello. You got a message from a customer. 

      管理画面より内容のご確認をお願いします。
      Please check the message from Admin.

      マイページログインはこちら
      Click here to log in to Admin
      medbank.sg/en/Admin_Login
      
      —----------------------------------------------
      ${message}
      
      —----------------------------------------------
      
      
    ※こちらのメールは送信専用となります。お問合せやお困りの際はマイページ内よりお願い致します。
     Please note that this e-mail is for sending only. 

      MEDBANK PTE. LTD. 
      
      `,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse(JSON.stringify({ message: 'Message sent successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse(JSON.stringify({ error: 'Error sending message' }), {
      status: 500,
    });
  }
}
