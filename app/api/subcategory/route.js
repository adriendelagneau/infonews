import { NextResponse } from "next/server"
import connect from "@/lib/db";
import Subcategory from "@/models/Subcategory";

export const GET = async (request) => {

    try {
        await connect()
        const subcategories = await Subcategory.find().populate('category')

        return new NextResponse(JSON.stringify(subcategories), { status: 200})
    } catch(err) {
        return new NextResponse("DB error" + err, { status: 500})
    }
}

export const POST = async (request) => {
    const body = await request.json();
  
    const newSubcategory = new Subcategory(body);
  
    try {
      await connect();
  
      await newSubcategory.save();
  
      return new NextResponse("Subcategory has been created", { status: 201 });
    } catch (err) {
      return new NextResponse("Database Error" +err, { status: 500 });
    }
  };