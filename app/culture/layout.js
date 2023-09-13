import React from 'react'

import CategoryLayout from '@/components/CategoryLayout';



const Layout = ({ children }) => {



  return (
    <>
         <CategoryLayout category={"culture"} subcategory={ ["videogame", "music", "series"]} />
        {children}
    </>
    
  )
}

export default Layout