import React from 'react'

import CategoryLayout from '@/components/CategoryLayout';



const Layout = ({ children }) => {



  return (
    <>
         <CategoryLayout category={"sport"} subcategory={ ["football", "basketball", "rugby", "combat", "tennis"]} />
        {children}
    </>
    
  )
}

export default Layout