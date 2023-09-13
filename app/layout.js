import { MenuProvider } from '../context/MenuContext'
import './globals.css'
import { Libre_Baskerville, Limelight } from 'next/font/google'
import Sidebar from '../components/Sidebar'
import AuthProvider from '@/components/provider/AuthProvider'
import LayoutProvider from '@/components/provider/LayoutProvider'
import localFont from "next/font/local"

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const limeLight = Limelight({ subsets: ['latin'], weight: '400', variable: '--font-limeLight' })
const LibreBaskerville = Libre_Baskerville ({ subsets: ['latin'], weight: '400', variable: '--font-libreBaskerville' })
const myFont = localFont({src: "../public/CloisterBlack.ttf",  variable: '--font-myFont'})

export const metadata = {
  title: 'La Voie de l info',
  description: 'journal de presse, d actualité',
  icons: {
    icon: "/newspepper.ico"
  }
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en" className={`${myFont.variable} ${limeLight.variable} ${LibreBaskerville.variable}`}>
      <body >
        <AuthProvider>
          <MenuProvider>
            <LayoutProvider>
            <Sidebar />
            {children}
            </LayoutProvider>
          </MenuProvider>
        </AuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
      </body>
    </html>
  )
}
