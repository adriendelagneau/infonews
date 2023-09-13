import { NextResponse } from "next/server";
import Stripe from "stripe";
//import User from "@/models/User";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
// Stripe requires the raw body to construct the event.

/*
const updateUserSubscription = async (session) => {

    const customerEmail = session.metadata.userEmail
    const subscriptionNumber = session.id
    console.log(subscriptionNumber,"sub")

    try {
         await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
             method: "put",
             headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email :customerEmail, isSubscribed: true, subscriptionNumber: subscriptionNumber })
        })
    } catch (err) {
        console.log(err)
    }
}
*/

export const POST = async (req, res) => {

    const text = await req.text();
    const sig = req.headers.get("stripe-signature")/// work


    let event 
    try {
        event = stripe.webhooks.constructEvent(text, sig, webhookSecret)
    } catch (err) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err.message}`)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
    }
    console.log("received ", event.type);


    if(event.type === 'checkout.session.completed'){
        const session = event.data.object
        //  updateUserSubscription(session)
        let schedule = await stripe.subscriptionSchedules.create({
            from_subscription: session.subscription
        })
        console.log(`Schedule created: ${schedule.id}`)
        const phases = schedule.phases.map(phase => ({
            start_date: phase.start_date,
            end_date: phase.end_date,
            items: phase.items
        }))
        console.log("phases", phases)
        schedule = await stripe.subscriptionSchedules.update(
            schedule.id,
            {
                end_behavior: "cancel",
                phases: [
                    ...phases,
                    {
                        items: [{
                            price: "price_1Np6JxENA1NVOuj2A89Svpk4",
                            quantity: 1
                        }],
                        iterations: 2
                    }
                ]
            }
        )




     //  console.log(session.metadata.userEmail, "session")
    }
    // Successfully constructed event
    return NextResponse.json({ succes: "xx" });
  };