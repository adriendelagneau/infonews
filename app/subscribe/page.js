"use client"
import getStripe from '@/utils/get-stripe';
import React from 'react'
import { useSession } from "next-auth/react";

const Subscribe = () => {
  const { data: session } = useSession()
  const userEmail = session?.user.email
  
    const pay = async (e) => {
      e.preventDefault();
        try {
            const res = await fetch(
                '/api/checkout_sessions', {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userEmail})
                    
                }
              );
            
              // Redirect to Checkout.
              const stripe = await getStripe();
            const data = await res.json()
           // console.log(data.session.id)
           const stripeResponse = await stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: data.session.id,
          });

            
        } catch (err) {
            console.log(err)
        }
         
  }
  return (
    <div data-value='Basic' onClick={(e)=>pay(e)} className="mt-[300px]">CheckoutButton</div>
  )
}

export default Subscribe