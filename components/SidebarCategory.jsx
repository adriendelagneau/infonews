"use client"
import React from 'react'
import useSWR from 'swr'
import CardSM from './CardSM'


async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/search?limit=5`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
 


  
const SidebarCategory = async () => {

  const data = await getData();
 
  return (
      <div className='w-full h-full'>
      {data.map((a, i) => (
            <div key={i}>
              <CardSM article={a} />
              <div className='w-full h-[1px] bg-slate-300 my-4'></div>
            </div>
          ))}
    </div>
  )
}

export default SidebarCategory