import { NextResponse } from "next/server"
import connect from "@/lib/db";
import User from "@/models/User";


export const POST = async (request) => {
  await connect();

  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    console.log("Received token:", typeof token, token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.error("User not found for token:", token);
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;

    await user.save();

    console.log("User verified:", user.email);

    return NextResponse.json({ message: "Email verified successfully", success: true });
  } catch (err) {
    console.error("Error while processing the request:", err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
