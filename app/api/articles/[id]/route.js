import { NextResponse } from "next/server";
import connect from "../../../../lib/db";
import Article from "../../../../models/Article";

export const GET = async (request, { params }) => {
    const { id } = params;
  
    try {
      await connect();
  
      const article = await Article.findById(id).populate(["author", "category", "subcategory"]);
  
      return new NextResponse(JSON.stringify(article), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  };
  
  export const DELETE = async (request, { params }) => {
    const { id } = params;
  
    try {
      await connect();
  
      await Article.findByIdAndDelete(id);
  
      return new NextResponse("Article has been deleted", { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error" , { status: 500 });
    }
  };