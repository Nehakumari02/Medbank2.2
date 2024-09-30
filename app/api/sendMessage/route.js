import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Conversation from "../../../models/conversation";
import Message from "../../../models/message";

export async function POST(req) {
  const { senderId, conversationId, message } = await req.json();

  try {
    await dbConnect();

    // Create and save the new message
    const newMessage = new Message({
      conversationId,
      senderId,
      text: message,
    });

    await newMessage.save();
    // console.log(messageRes)

    // Update the last message in the conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: {
        text: message,
        senderId,
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
