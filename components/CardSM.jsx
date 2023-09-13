import Link from 'next/link'
import React from 'react'

const CardSM = ({ article }) => {
  
  var createdAtDate = new Date(article.createdAt);

// Define options for date formatting
var options = { year: 'numeric', month: '2-digit', day: '2-digit' };

// Format the date using toLocaleDateString with the specified options
var formattedDate = createdAtDate.toLocaleDateString('en-US', options);
   
    return (
      <Link href="/" className='hover:cursor-pointer'>
      <div className='w-full px-1 font-sans'>
          <div className='mb-1 text-2xl capitalize bold line-clamp-2'>{article.title}</div>
         
          <div className='w-full text-sm font-light line-clamp-3'>{article.content[0].text[0]}</div>
           
         
          <div className='flex justify-between mt-4 text-xs text-gray-700'>
            
          <div className=''>{article.author.name}</div>
          <div>{formattedDate}</div>
          </div>
    </div>
      </Link>
  )
}

export default CardSM