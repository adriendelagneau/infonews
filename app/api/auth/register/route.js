import connect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import sendEmail from "@/utils/mailer";

connect();
export async function POST(req) {
  console.log("register")
  try {
    const { name, email, password } = await req.json();
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(name, email, password)
    
    const savedUser =  new User({ name, email, password: hashedPassword });

    await savedUser.save()

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });


    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." + err },
      { status: 500 }
    );
  }
}
