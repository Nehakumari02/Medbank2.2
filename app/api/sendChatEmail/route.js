import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Conversation from "../../../models/conversation";
import Message from "../../../models/message";
import User from "../../../models/user";  // Assuming you have a User model
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { userId, message,cc } = await req.json();  // Only require userId and message in the request body
  const hardcodedSenderId = "66e055de6ddc7825fbd8a103"; // Replace with actual hardcoded sender ID

  try {
    await dbConnect();

    // Step 1: Fetch user email and name from the database using userId
    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const { name, email } = user;

    // Step 3: Handle sending the email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_SIGNUP,
      to: email,
      cc:cc,
      subject: "MEDBANK 【遺伝子解析について】Genetic Analysis",
      text: `Dear ${name}

      こんにちは。MEDBANK株式会社の佐藤みずきです。
      Hello. I am Mizuki Sato from MEDBANK.
      
      メッセージをお送りしていますので、マイページより内容のご確認をお願いします。
      Please check the message from My Page.
      
      マイページログインはこちら
      Click here to log in to My Page
      meduon.jp/en/Login
      
      —----------------------------------------------
      ${message}
      
      —----------------------------------------------
      
      ※こちらのメールは送信専用となります。お問合せやお困りの際はマイページ内よりお願い致します。
      Please note that this e-mail is for sending only. If you have any questions or problems, please contact us from My Page.
      
      MEDBANK株式会社　担当　佐藤みずき
      MEDBANK PTE. LTD. Mizuki Satou
      
      `,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse(JSON.stringify({ message: 'Message sent and email sent successfully' }), { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new NextResponse(JSON.stringify({ error: 'Error processing request' }), { status: 500 });
  }
}
