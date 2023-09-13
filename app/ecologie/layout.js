import React from 'react'

import CategoryLayout from '@/components/CategoryLayout';



const Layout = ({ children }) => {



  return (
    <>
         <CategoryLayout category={"ecologie"} subcategory={ ["national", "international"]} />
        {children}
    </>
    
  )
}

export default Layout