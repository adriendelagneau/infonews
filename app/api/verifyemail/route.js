import { NextResponse } from "next/server"
import connect from "@/lib/db";
import User from "@/models/User";


export const POST = async (request) => {
  
  await connect();

    try {
        const reqBody = await request.json()
        const { token } = reqBody

      console.log(token)
      
      const user = await  User.findOne(
            { verifyToken: token }
      )
        console.log("titi", user)
        if (!user) {
            return NextResponsejson({error: "invalid token"}, { status: 400 });
        }
     

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpires = undefined

        await user.save()

        return NextResponse.json({message: "Email verified successfully", success: true});
    
    } catch (err) {
      return  NextResponse.json({error: err}, { status: 500 });
    }
  };