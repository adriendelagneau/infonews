import Link from 'next/link';
import React from 'react'

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/search?category=culture`, {
      cache: "no-store",
    });
  
    if (!res.ok) {

      throw new Error("Failed to fetch data");
    }
  
    return res.json();
    
  } catch (err) {
    console.log(err)
  }
}


const Economic = async () => {
 const data = await getData();

  return (
    <>
      {
      data.map((a, i) => (
        <div key={i}>{a.title}</div>
        ))}
    </>
  )
}

export default Economic