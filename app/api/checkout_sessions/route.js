import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const POST = async (req, res) => {

  const origin = req.headers.get('origin')
  
 const data = await req.json()
  

  const userEmail = data.userEmail


  try {
          // Create Checkout Sessions from body params.
          const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1NlTkPENA1NVOuj2iO51qMnc',
                quantity: 1,
              },
            ],
            mode: 'subscription',
            success_url: `${origin}/?success=true`,
            cancel_url: `${origin}/?canceled=true`,
            metadata: {
              userEmail: userEmail,
          }
          });
      return NextResponse.json({session})
    } catch (err) {
      return new NextResponse("Stripe error" +err, { status: 500 });
    }
  };