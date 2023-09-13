 // Use the client directive for using usePathname hook.
 'use client'

 // Use usePathname for catching route name.
 import { usePathname } from 'next/navigation';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Navbar2 from '../Navbar2';
 
 const LayoutProvider = ({ children }) => {
     const pathname = usePathname();
     return (
         <>
             {pathname === "/" ? <Navbar /> : <Navbar2 />}
             {children}
             {!(pathname === "/register" || pathname === "/login") && <Footer/>}
         </>
     )
 };

 export default LayoutProvider