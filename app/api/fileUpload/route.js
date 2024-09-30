import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/order";
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

export async function POST(req) {
  const {fileName,fileType} = await req.json();
  console.log(fileName)
  try {
    const params={
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Expires: 1000,
      ContentType:fileType
    }

    let url = await s3.getSignedUrlPromise('putObject',params)
    
    if (url) {
      return new NextResponse(
        JSON.stringify({ url:url }),
        { status: 200 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Failed to generate url" }),
      { status: 400 }
    );
  } catch (error) {
    console.log("Error fetching order:", error);
    return new NextResponse(
      JSON.stringify({ error }),
      { status: 500 }
    );
  }
}
