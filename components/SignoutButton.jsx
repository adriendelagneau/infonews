'use client'
import React from 'react'
import { signOut, useSession } from "next-auth/react";
const SignoutButton = () => {
    const session  = useSession();

    if (session) {
      return <button onClick={signOut}>Sign Out</button>;
    }
  
    return null; // Display nothing if not signed in
}

export default SignoutButton