import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Adjust path as needed
import Conversation from '../../../models/conversation'; // Adjust path as needed

export async function POST(req) {
  try {
    await dbConnect();

    // Extract conversationId from the request body
    const { conversationId } = await req.json();

    if (!conversationId) {
      return new NextResponse(
        JSON.stringify({ error: "Conversation ID is required" }),
        { status: 400 }
      );
    }

    // Fetch the specific conversation by conversationId
    const conversation = await Conversation.findById(conversationId)
      .populate({
        path: 'participants',
        select: 'name email', // Specify the fields you want to include
      });

    if (!conversation) {
      return new NextResponse(
        JSON.stringify({ error: "Conversation not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Conversation fetched successfully",
        conversation,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching conversation" }),
      { status: 500 }
    );
  }
}
