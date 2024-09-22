import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Import the MongoDB client promise

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body; // Extract email from the request body

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

    // Return a success response
    return NextResponse.json({ message: 'Form submitted successfully', result });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ message: 'Error submitting form', error }, { status: 500 });
  }
}