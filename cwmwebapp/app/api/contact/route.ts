import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // TODO: Add your email service integration here
    // For now, we'll just log the data and return success
    console.log("Contact form submission:", {
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
