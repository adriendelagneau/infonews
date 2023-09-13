import { NextResponse } from "next/server"
import connect from "@/lib/db";
import Category from "@/models/Category";

export const GET = async (request) => {

    try {
        await connect()
        const categories = await Category.find()

        return new NextResponse(JSON.stringify(categories), { status: 200})
    } catch(err) {
        return new NextResponse("DB error" + err, { status: 500})
    }
}

export const POST = async (request) => {
    const body = await request.json();
  
    const newCategory = new Category(body);
  
    try {
      await connect();
  
      await newCategory.save();
  
      return new NextResponse("Category has been created", { status: 201 });
    } catch (err) {
      return new NextResponse("Database Error" +err, { status: 500 });
    }
  };