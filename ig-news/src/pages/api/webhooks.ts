import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { Readable } from "stream";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscriptions";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}
// cancela a conversão automático do body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Array sem duplicate
const relevantEvents = new Set([
  "checkout.session.completed",
  // "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

const webhooks = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const buf = await buffer(request);
    const secret = request.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      // garante que o secret (.env) do webhook é o mesmo vindo da requisição do stripe
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return response.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription;

            /**
             * só vai criar no DB caso o type seja "customer.subscription.created"
             */
            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              false
              // type === "customer.subscription.created"
            );
            break;

          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            );
            break;

          default:
            throw new Error("Unhandled event.");
        }
      } catch (err) {
        return response.json({ error: "Webhook has failed" });
      }
    }

    response.json({ received: true });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};

export default webhooks;
