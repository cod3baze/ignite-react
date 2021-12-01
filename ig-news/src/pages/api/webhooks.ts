import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { Readable } from "stream";
import { stripe } from "../../services/stripe";

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
const relevantEvents = new Set(["checkout.session.completed"]);

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
      console.log("evento recebido: ", event);
    }

    response.json({ received: true });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
};

export default webhooks;
