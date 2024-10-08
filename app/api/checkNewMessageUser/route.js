// pages/api/checkNewMessages.js

import dbConnect from "@/lib/dbConnect";
import Conversation from "@/models/conversation";
import { NextResponse } from "next/server";

export async function POST(req) {

  const { userId } = await req.json(); // Get the userId from the request body

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: "User ID is required" }),
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    // Find conversations involving the user
    const conversations = await Conversation.find({
      participants: userId,
      "lastMessage.seen": false, // Look for messages that are not seen
    }).select("lastMessage"); // Only fetch the lastMessage field

    // Check if any conversation has an unseen message not sent by the user
    const hasNewMessages = conversations.some(
      (conversation) => conversation.lastMessage.senderId.toString() !== userId
    );

    return new NextResponse(
      JSON.stringify({ hasNewMessages }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking new messages:", error);
    return new NextResponse(
      JSON.stringify({ error: "Server error while checking new messages"}),
      { status: 500 }
    );
  }
}
