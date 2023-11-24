import express from "express";

const app = express();
const port = 3000;
const PUBLISHABLE_KEY =
  "pk_test_51OFjR5KpbrGf79n9xGCl9UmhH9Jw7UrNw4bfk6SwS7d4OlQp2AEwKM4jMfTMWksqYH1P4ITDdxYE6UbwKYpQiaCv00mMs543VC";
const SECRET_KEY =
  "sk_test_51OFjR5KpbrGf79n9Sg04DmPw3dLBwtKiJD9cnVh1EvH6rDjjILaPUM3VQJAXlmhhXq6atHe2x266VfISbHTpouYr00JE6C2GP6";
import Stripe from "stripe";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2023-10-16" });

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "euro",
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
