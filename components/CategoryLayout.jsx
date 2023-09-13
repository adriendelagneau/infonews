

import React from 'react'

import Link from 'next/link'



const CategoryLayout = ({ category, subcategory }) => {



    return (
        <div className='pt-[140px] max-w-7xl flex mx-auto  items-end px-5'>
            <h1 className='mr-6 text-3xl capitalize'>
                <Link href={`/${category}`}>{category}</Link>
            </h1>
            <ul className='flex justify-center gap-4 text-lg'>

                {subcategory.map((subcat, index) => (
                    <li key={index} className="capitalize">
                        <Link href={`/${category}/${subcat}`}>

                            {subcat}
                        </Link>
                    </li>
                ))}
            </ul>
     
        </div>
    )
}

export default CategoryLayout