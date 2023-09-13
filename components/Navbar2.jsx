'use client'

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import NavbarCategory from './NavbarCategory'
import NavbarTitle from './NavbarTitle'
import { useSession } from "next-auth/react";
import { MenuContext } from '@/context/MenuContext';
import SignoutButton from './SignoutButton';

import { usePathname } from 'next/navigation';

const Navbar2 = () => {
  const [showTitle, setShowTitle] = useState(true);
  //const session = useSession();
  const { toggle, closeMenu } = useContext(MenuContext)

 
  return (
    <>
      <nav className=" fixed top-0 left-0 z-50 bg-white  w-full h-[65px] flex items-center px-3 py-2  border-b border-gray-200 text-sm font-semibold tracking-wider">

        <div className="flex w-auto">
          <div className='p-2 rounded-full hover:bg-gray-100'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hover:cursor-pointer " onClick={() => toggle()} >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </div>
          <div className='p-2 rounded-full hover:bg-gray-100'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hover:cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
            </svg>
          </div>
        </div>

        <div className="flex-grow ">
          {showTitle ? <NavbarTitle /> : <NavbarCategory />}
        </div>


        <div className="flex w-auto">
          <div className='hidden md:inline'>
            <Link href="/" className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-500"  onClick={() => closeMenu()}>Subscribe</Link>
          </div>
          <div className="pl-5">
            <Link href="/login" className="p-2 rounded-full hover:bg-gray-100" onClick={() => closeMenu()}>Connect</Link>
          </div>
      
        </div>

      </nav>
    </>
  )
}

export default Navbar2