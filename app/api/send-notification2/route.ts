import admin from 'firebase-admin';
import { Message } from 'firebase-admin/messaging';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require('../../../service_key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  try {
    const { adminIdDB, title, message, link } = await request.json();
    await dbConnect();

    // Fetch user email and name from the database using userId
    const user = await User.findById(adminIdDB);

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const { token } = user;
    console.log("token2",token)

    // Prepare notification payload
    const payload: Message = {
      token,
      notification: {
        title,
        body: message,
      },
      webpush: link ? {
        fcmOptions: {
          link,
        },
      } : undefined,
    };

    // Send the notification
    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: 'Notification sent!' });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error processing request' }), { status: 500 });
  }
}
