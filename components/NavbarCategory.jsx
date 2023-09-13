import Link from 'next/link'
import React from 'react'
import NavbarTitle from './NavbarTitle'
import { categoryData } from '@/constants'


const NavbarCategory = () => {
  return (
    <>
      
    <ul className="hidden gap-1 pl-5 text-lg capitalize md:pl-12 sm:flex">
      {categoryData.map((link, i) => (
        <li className="p-2 rounded-full hover:bg-gray-100 " key={i}>
          <Link href={link.url}>{link.name}</Link>
        </li>
      ))}
      </ul>
      <div className='text-center sm:hidden'>
          <h2 className='text-2xl font-semibold font-title'>La Voie De L&rsquo;Info</h2>
          <p className="font-normal">Votre fenêtre sur l&rsquo;actualité</p>

    </div>
      </>
  )
}

export default NavbarCategory