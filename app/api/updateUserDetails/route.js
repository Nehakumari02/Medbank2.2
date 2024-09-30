import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";

export async function POST(req) {
  try {
    const {
      Username,
      name,
      school,
      faculty,
      field,
      others,
      service,
      country,
      phone,
      email,
      confirmEmail,
      Perfecture,
      postalCode,
      city,
    } = await req.json();

    // Ensure email and confirmEmail match
    if (email !== confirmEmail) {
      return new NextResponse(JSON.stringify({ error: 'Emails do not match' }), {
        status: 400,
      });
    }

    await dbConnect();

    // Update the user details based on email (assuming email is unique and used to identify the user)
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        Username,
        name,
        school,
        faculty,
        field,
        others,
        service,
        country,
        phone,
        Perfecture,
        postalCode,
        city,
      },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ message: 'User details updated successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    return new NextResponse(JSON.stringify({ error: 'Error updating user details' }), {
      status: 500,
    });
  }
}

