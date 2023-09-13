'use client'

import React, { useContext, useRef, useState } from 'react';
import { MenuContext } from '@/context/MenuContext';
import { categoryData } from '@/constants';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'


const Sidebar = () => {
  const { isOpen, closeMenu } = useContext(MenuContext);
  const [inputSearch, setInputSearch] = useState("")
  const router = useRouter()

  // State to keep track of the currently hovered category
  const [currentCategory, setCurrentCategory] = useState(null);
  // Function to handle mouse enter event for a category
  const handleMouseEnter = (categoryId) => {
    setCurrentCategory(categoryId);
  };
  // Function to handle mouse leave event for a category
  const handleMouseLeave = () => {
    setCurrentCategory(null);
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get(`/api/articles/search?title=${inputSearch}`)
      if (res.request.status === 200 && res.data.length > 0) {
        closeMenu()
        setInputSearch("")
        router.push(`${process.env.NEXT_PUBLIC_BASE}/search?title=${inputSearch}`)
      }
    } catch (err) {
      console.log(err);
    }
  }



  return (
    <>
      {/* Overlay to capture clicks and close the sidebar */}
      <div className={`w-full h-[calc(100vh-65px)] opacity-30 fixed top-[65px] left-500 text-lg font-medium capitalize ${isOpen ? 'z-20 bg-gray-900' : '-z-10'}`} onClick={closeMenu}></div>
      {/* Sidebar container */}
      <div className={`w-[220px] h-[calc(100vh-65px)] z-30 bg-white fixed top-[65px] transition-all duration-300 ease-in-out border-r ${isOpen ? 'left-0' : '-left-[250px]'}`}>
        <div className='w-full mt-8 mb-5 text-center'>
          <Link href="/" className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-500" onClick={closeMenu}>Subscribe</Link>
        </div>
        

        <form onSubmit={(e) => handleSubmit(e)}>
  <div className='relative my-[30px]'>
    <input
      type="text"
      placeholder='Search'
      className='w-[90%] py-2 pl-1 ml-3 border border-gray-400 pr-8 focus:border-1 focus:outline outline-1 outline-blue-900'
              onChange={(e) => setInputSearch(e.target.value)}
              value={inputSearch}
    />
    <div
      className='absolute cursor-pointer right-6 top-2.5'
      onClick={handleSubmit}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    </div>
  </div>
</form>


        
        {/* Navigation list */}
        <ul className='w-full h-full py-3'>
          {categoryData?.map((link, i) => (
            <li key={i} className="relative">
              {/* Main category link */}
              <Link
                href={link.url}
                className="relative flex items-center justify-between hover:bg-blue-100 hover:cursor-pointer"
                onMouseEnter={() => handleMouseEnter(link.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  closeMenu()
                  setCurrentCategory(null)
                }}
              >
                {/* Main category name */}
                <div className='p-3 capitalize'>{link.name}</div>
                {/* Show the '>' svg, if the category has subcategories */}

              </Link>

              {/* Show subcategory list if the category is currently hovered */}
              {currentCategory === link.id && (
                <div className='absolute right-0 top-[50%] transform translate-x-[100%] translate-y-[-50%] flex flex-col capitalize'
                  onMouseEnter={() => handleMouseEnter(link.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <ul className='pl-4 bg-white custom-clip-path min-w-[130px] border'>
                    {link.subcategory

                      .map((subcategory, subIndex) => (
                        <li key={subIndex} className="flex bg-white">
                          <Link
                            href={subcategory.url}
                            onClick={() => {
                              closeMenu()
                              setCurrentCategory(null)
                            }}
                            className="w-full px-4 py-2 hover:bg-blue-100 hover:cursor-pointer"
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
