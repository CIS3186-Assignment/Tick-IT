import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

const API_URL = "https://us-central1-tick-it-6452c.cloudfunctions.net";

const StripeApp = (props) => {
  const [email, setEmail] = useState("");
  const [cardDetails, setCardDetails] = useState({});
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: "eur",
        }),
      });

      const data = await response.text(); // Read the response as text
      try {
        const jsonData = JSON.parse(data); // Attempt to parse as JSON
        if (!response.ok) {
          throw new Error(jsonData.error || "Server error");
        }

        if (!jsonData.clientSecret) {
          throw new Error("Invalid response from server");
        }

        return { clientSecret: jsonData.clientSecret };
      } catch (jsonParseError) {
        // Log the non-JSON response for debugging
        console.error("Non-JSON response from server:", data);
        throw jsonParseError; // Rethrow the JSON parse error
      }
    } catch (error) {
      console.error("Error fetching payment intent:", error.message);
      throw error;
    }
  };

  const handlePayPress = async () => {
    if (!cardDetails.complete || !email) {
      Alert.alert("Please enter complete card details and email");
      return;
    }

    const billingDetails = {
      email: email,
    };

    try {
      const { clientSecret } = await fetchPaymentIntentClientSecret();
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: "Card",
        billingDetails: billingDetails,
      });

      if (error) {
        Alert.alert(`Payment Confirmation Error: ${error.message}`);
      } else if (paymentIntent) {
        Alert.alert("Payment Successful");
        console.log("Payment successful", paymentIntent);
      }
    } catch (e) {
      console.error("Error handling payment:", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
};

export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
