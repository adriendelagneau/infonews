import React from 'react'
import Image from "next/image";
import { notFound } from "next/navigation";
import Author from '@/models/Author';
import SidebarCategory from '@/components/SidebarCategory';

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


  // Format date like 
  const convertedDate = new Date(data.createdAt)
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = convertedDate.toLocaleString('en-US', options);

  return (
    <main className="min-h-[200vh] max-w-7xl mt-14 mx-auto flex flex-col px-5">


      
      <h1 className='mb-10 text-5xl capitalize'>{data.title}</h1>
      
      <div className='flex items-center mb-2'>
        <span>
          <Image src={data.author.picture} alt={data.title} width={40} height={40} className="mr-5 rounded-full" />
        </span>
        <span className='text-gray-900'>Written by :<span className='font-medium uppercase'> {data.author.name}</span></span>
      </div>

      
      <div className='flex capitalize'>
        <span className="mb-4 text-gray-600">
          {formattedDate}
        </span>
      </div>


      <div className='relative flex w-full h-auto '>

        <div className='flex-grow  max-w-[923px]  '>
        
      
      <Image src={data.imgXL} alt={data.title} width={850} height={350} />
      
      <div>
        {data.content.map((c,i) => (
          <div key={i} className="pr-5 mt-14">
            <h2 className='mb-5 text-3xl capitalize'>{c.title}</h2>
            {c.text.map((t, j) => (
              <p key={j} className="mb-10 text-xl leading-9">{t }</p>
            ))}
          </div>
        ))}
      </div>
        </div>

        <div className='sticky top-20 w-[300px] h-[800px] ml-5 hidden xl:inline '>
          <SidebarCategory category={data.category.name } />
        </div>

      </div>
    </main>
  )
}

export default page