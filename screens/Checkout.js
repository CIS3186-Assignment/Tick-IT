import * as React from "react";
import { Button, Text, View, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView,} from "react-native";
import {StripeProvider, CardField, useConfirmPayment,} from "@stripe/stripe-react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import PurchaseSummary from "../components/PurchaseSummary";
import { SafeAreaProvider } from "react-native-safe-area-context";


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
  
  return (
    <SafeAreaProvider> 
      <View> 
          <PurchaseSummary totalAmount={totalAmount} event={event} ticketCounts={ticketCounts}/>
      </View>
      <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <View style={styles.paymentSection}>
          <KeyboardAvoidingView>
          <CardField
            postalCodeEnabled={false}
            autofocus
            style={[styles.cardField, styles.cardFieldContainer]}
            cardStyle={{
              textColor: "#1c1c1c",
            }}
          />
          </KeyboardAvoidingView>
          <TouchableOpacity
              onPress={handlePayPress}
              disabled={loading || success}
              style={[
                styles.button,
                { backgroundColor: loading || success ? "gray" : "#253354" },
              ]}
            >
              <Text style={styles.buttonText}>Purchase</Text>
            </TouchableOpacity>
        </View>
      </View>
    </StripeProvider>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 0,
    backgroundColor: "#141414",
  },
  cardField: {
    height: 60,
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
  paymentSection: {
    marginTop: 20,
    marginHorizontal: 25,
    paddingBottom: 70
  },
  button: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText:{
    color: '#fff',
    fontSize: 18
  }
});
