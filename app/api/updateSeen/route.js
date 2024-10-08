import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Conversation from "../../../models/conversation";

export async function POST(req) {
  const { conversationId, userId } = await req.json(); // Parse request body to get conversationId and userId

  try {
    await dbConnect(); // Ensure the database connection is established
    console.log(conversationId,userId)

    // Find the conversation by ID
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return new NextResponse(
        JSON.stringify({ message: "Conversation not found" }),
        { status: 404 }
      );
    }

    // Check if the user is not the sender of the last message
    if (String(conversation.lastMessage.senderId) !== String(userId)) {
      // Update the seen field to true
      conversation.lastMessage.seen = true;
      await conversation.save(); // Save the updated conversation

      return new NextResponse(
        JSON.stringify({ message: "Conversation marked as seen" }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "User is the sender, no need to update seen status" }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error updating seen status:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error updating seen status" }),
      { status: 500 }
    );
  }
}
