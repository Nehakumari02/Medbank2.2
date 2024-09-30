import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Conversation from "../../../models/conversation";
import Message from "../../../models/message";

export async function POST(req) {
  const { userId, message } = await req.json();
  const hardcodedSenderId = "66e055de6ddc7825fbd8a103"; // Replace with actual hardcoded sender ID

  try {
    await dbConnect();

    // Find the conversation where userId is in participants
    const conversation = await Conversation.findOne({
      participants: hardcodedSenderId
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
      senderId: userId, // Use hardcoded sender ID
      text: message,
    });

    const res = await newMessage.save();
    console.log(res)

    // Update the last message in the conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: {
        text: message,
        senderId: userId, // Use hardcoded sender ID
      },
    });

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
