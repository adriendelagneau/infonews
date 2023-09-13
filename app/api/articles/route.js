import { NextResponse } from "next/server"
import connect from "@/lib/db";
import Article from "@/models/Article";

export const GET = async (request) => {

  await connect()
    try {
        const articles = await Article.find().populate(["author", "category", "subcategory"])

        return new NextResponse(JSON.stringify(articles), { status: 200})
    } catch(err) {
        return new NextResponse("DB error", { status: 500})
    }
}

export const POST = async (request) => {
    const body = await request.json();
  
    const newArticle = new Article(body);
    
    await connect();
    try {
  
      await newArticle.save();
  
      return new NextResponse("Article has been created", { status: 201 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };