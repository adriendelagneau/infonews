"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

const VerifyEmail = () => {
  
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)


    const verifyUserEmail = async () => {
        try {
           await axios.post('/api/verifyemail', {token})
            setVerified(true)
        } catch (err) {
            setError(true)
            console.log(err.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken)
    }, [])
    
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    },[token])
  
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>verifi</h1>

    </div>
  )
}

export default VerifyEmail