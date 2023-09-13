import React from 'react'
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/${id}`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      return notFound()
    }
  
    return res.json();
  }
  
  
  export async function generateMetadata({ params }) {
  
    const article = await getData(params.id)
    return {
      title: article.title,
      description: article.description,
    };
  }

const page = async ({ params }) => {
    const data = await getData(params.id);

  return (
    <div>page</div>
  )
}

export default page