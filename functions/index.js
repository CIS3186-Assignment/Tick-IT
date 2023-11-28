const functions = require("firebase-functions");
const stripe = require("stripe")(
    "sk_test_51OFjR5KpbrGf79n9Sg04DmPw3dLBwtKiJD9cnVh1EvH" +
    "6rDjjILaPUM3VQJAXlmhhXq6atHe2x266VfISbHTpouYr00JE6C2GP6",
);

exports.createPaymentIntent = functions.https.onRequest((request, response) => {
  stripe.paymentIntents
      .create({
        amount: request.body.amount,
        currency: "eur",
        payment_method_types: ["card"],
      })
      .then((token) => {
        response.send(token);
      })
      .catch((error) => {
        console.log(error);
      });
});
