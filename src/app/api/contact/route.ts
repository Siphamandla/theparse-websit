import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Import the MongoDB client promise
import sendEmail from "@/lib/sendgrid"; // Ensure named export is correct

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body; // Destructure both email and name from the request body

    const client = await clientPromise;  // Await the MongoDB client connection
    const db = client.db('theParse');
    const collection = db.collection('contacts-us');

    // Check if an email already exists in the database
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      // Return an error response if the email is already in use
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Insert form data into MongoDB if no duplicate email is found
    const result = await collection.insertOne(body);

    // Send confirmation email after adding the user
    await sendEmail({
      to: email,
      cc: "",
      bcc: process.env.THEPARSE_CONTACTUS_BCC || "", // Ensure BCC is available
      dynamicTemplateData: {
        name: name,
        email: email,
      },
      templateId: process.env.THEPARSE_CONTACTUS_TEMPLATE_ID, // Ensure Template ID is set
    });

    // Return a success response
    return NextResponse.json({ message: 'Form submitted successfully', result });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ message: 'Error submitting form', error }, { status: 500 });
  }
}