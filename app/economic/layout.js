import React from 'react'

import CategoryLayout from '@/components/CategoryLayout';



const Layout = ({ children }) => {



  return (
    <>
         <CategoryLayout category={"economic"} subcategory={ ["national", "international"]} />
        {children}
    </>
    
  )
}

export default Layout