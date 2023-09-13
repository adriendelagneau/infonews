import { NextResponse } from "next/server"
import connect from  "@/lib/db";
import Author from "@/models/Author";

export const GET = async (request) => {

  

    try {
        await connect()
        const authors = await Author.find()

        return new NextResponse(JSON.stringify(authors), { status: 200})
    } catch(err) {
        return new NextResponse("DB error" + err, { status: 500})
    }
}

export const POST = async (request) => {
    const body = await request.json();
  
    const newAuthor = new Author(body);
  
    try {
      await connect();
  
      await newAuthor.save();
  
      return new NextResponse("Author has been created", { status: 201 });
    } catch (err) {
      return new NextResponse("Database Error" +err, { status: 500 });
    }
  };