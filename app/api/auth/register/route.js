import connect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sendEmail from "@/utils/mailer";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 409 }); // HTTP status code 409 for conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await connect();
    const newUser = await User.create({ name, email, password: hashedPassword });

    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error(error); // Corrected from console.log(err)
    return NextResponse.json(
      { message: "An error occurred while registering." },
      { status: 500 }
    );
  }
}
