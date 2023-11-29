import * as React from "react";
import { Button, Text, View, StyleSheet, Alert} from "react-native";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import PurchaseSummary from "../components/PurchaseSummary";


export const API_URL = "https://us-central1-tick-it-6452c.cloudfunctions.net";
export const PUBLISHABLE_KEY =
  "pk_test_51OFjR5KpbrGf79n9xGCl9UmhH9Jw7UrNw4bfk6SwS7d4OlQp2AEwKM4jMfTMWksqYH1P4ITDdxYE6UbwKYpQiaCv00mMs543VC";

export default function App() {
  const { confirmPayment, loading } = useConfirmPayment();
  const [success, setSuccess] = React.useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { totalAmount, event, ticketCounts } = route.params;

  fetchPaymentIntentClientSecret = async () => {
    const res = await fetch(`${API_URL}/createPaymentIntent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmount * 100,
        currency: "usd",
      }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.log(error);
      });

    return res?.client_secret;
  };

  const handlePayPress = async () => {
    const billingDetails = {
      email: "jenny.rosen@example.com", //ToDo replace with SSO email
    };

    const clientSecret = await fetchPaymentIntentClientSecret();

    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log("Payment confirmation error", error);
      Alert.alert("Error!");
    } else if (paymentIntent) {
      console.log("Success from promise", paymentIntent);
      // Alert.alert("Payment Successful!");
      setSuccess(true);
      navigation.navigate("Receipt", {
        event,
        ticketCounts,
        totalAmount,
      });
    }
  };
  
  const TicketCost = ({ticketKey}) => {
    const quantity = ticketCounts[ticketKey];
    const price = event.tickets.find(ticket => ticket.name === ticketKey).price;

    return (
      <Text>
        {ticketKey} (${price}) x {quantity} = ${price * quantity}
      </Text>
    );
  }

  return (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <PurchaseSummary totalAmount={totalAmount} event={event} ticketCounts={ticketCounts}/>
        <CardField
          postalCodeEnabled={false}
          autofocus
          style={styles.cardField}
          cardStyle={{
            textColor: "#1c1c1c",
          }}
        />
        <Button
          onPress={handlePayPress}
          title="Pay"
          disabled={loading || success}
        />
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },
  cardField: {
    height: 40,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "70%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 25,
    marginVertical: 20,
    backgroundColor: "#bbe",
    alignSelf: "center",
  },
});
