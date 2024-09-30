import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Adjust path as needed
import Conversation from '../../../models/conversation'; // Adjust path as needed

export async function POST(req) {
  try {
    await dbConnect();

    // Fetch all conversations
    const conversations = await Conversation.find()
      .populate({
        path: 'participants',
        select: 'name email' // Specify the fields you want to include
      })
      .sort({ createdAt: -1 });

    if (!conversations || conversations.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No conversations found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Conversations fetched successfully",
        data: conversations
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error fetching conversations" }),
      { status: 500 }
    );
  }
}
