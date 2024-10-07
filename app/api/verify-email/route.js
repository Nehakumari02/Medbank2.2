import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token'); // Get the token from the URL
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const domain = process.env.BASE_URL;

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

    // Send an HTML response
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email Verified</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
            .container { padding: 20px; background-color: #f8f8f8; border-radius: 8px; display: inline-block; }
            h1 { color: #4CAF50; }
            a { display: block; margin-top: 20px; text-decoration: none; color: #2196F3; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email verified successfully!</h1>
            <p>You can now sign in to your account.</p>
            <a href="/en/Login">Sign in is here</a>
            <p>メールアドレスが承認されました。</p>
            <a href="/jn/Login">ログインページはこちら</a>
          </div>
        </body>
      </html>
    `;

    return new NextResponse(htmlContent, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

    // return new NextResponse(JSON.stringify({ message: 'Email verified successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Error verifying email' }), { status: 500 });
  }
}
