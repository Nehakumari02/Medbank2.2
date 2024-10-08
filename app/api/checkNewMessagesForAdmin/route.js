// pages/api/checkNewMessagesForAdmin.js

import dbConnect from "@/lib/dbConnect";
import Conversation from "@/models/conversation";
import { NextResponse } from "next/server";

export async function POST(req) {

  const { adminId } = await req.json();; // Get the adminId from the request body

  if (!adminId) {
    return new NextResponse(
      JSON.stringify({ error: "Admin ID is required" }),
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    // Find conversations with unseen messages not sent by the admin
    const conversations = await Conversation.find({
      "lastMessage.seen": false, // Find messages that are not seen
    }).select("lastMessage"); // Only fetch the lastMessage field

    // Count the number of new messages not sent by the admin
    const newMessagesCount = conversations.reduce((count, conversation) => {
      return conversation.lastMessage.senderId.toString() !== adminId
        ? count + 1
        : count;
    }, 0);

    // Determine if there are any new messages
    const hasNewMessages = newMessagesCount > 0;

    return new NextResponse(
      JSON.stringify({ hasNewMessages, newMessagesCount }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking new messages for admin:", error);
    return new NextResponse(
      JSON.stringify({ error: "Server error while checking new messages"}),
      { status: 500 }
    );
  }
}
