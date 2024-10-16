import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Conversation from "../../../models/conversation";
import Message from "../../../models/message";
import User from "../../../models/user";

export async function POST(req) {
  const { userId } = await req.json();
  console.log("user id from frontend",userId)
  try {
    // Connect to the database
    await dbConnect();

    // Find the conversation with the given userId
    const conversation = await Conversation.findOne({
      participants: userId,
    });

    const userDetails = await User.findOne({
      _id:userId
    })
    .select(['name','email','ccEmails'])
    .exec();

    if (!conversation) {
      return new NextResponse(JSON.stringify({ error: 'Conversation not found' }), {
        status: 404,
      });
    }

    // console.log("Conversation found:", conversation);

    // Find messages with the conversationId
    // const messages = await Message.find({ conversationId: conversation._id });
    const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: -1 }).limit(120);


    // console.log("Messages found:", messages);

    // Return the conversationId and messages
    return new NextResponse(JSON.stringify({ conversationId: conversation._id, messages, userDetails }), {
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse(JSON.stringify({ error: 'Error registering user or retrieving messages' }), {
      status: 500,
    });
  }
}
