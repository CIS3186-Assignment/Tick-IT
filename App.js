import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native"; // Import StripeProvider


import EventDetails from "./screens/EventDetails";
import EventCatalog from "./screens/EventCatalog";
import Profile from "./screens/Profile";
import Wallet from "./screens/Wallet";
import EventCreator from './screens/EventCreator';
import Checkout from "./screens/Checkout"; // Import the Checkout component
import Receipt from "./screens/Receipt";
import TicketDetails from "./screens/TicketDetails";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StripeProvider publishableKey="pk_test_51OFjR5KpbrGf79n9xGCl9UmhH9Jw7UrNw4bfk6SwS7d4OlQp2AEwKM4jMfTMWksqYH1P4ITDdxYE6UbwKYpQiaCv00mMs543VC">
          <NavigationContainer>
            <Stack.Navigator initialRouteName="EventCatalog">
              <Stack.Screen
                name="EventCatalog"
                component={EventCatalog}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EventCreator"
                component={EventCreator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Wallet"
                component={Wallet}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TicketDetails"
                component={TicketDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EventDetails"
                component={EventDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Receipt"
                component={Receipt}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </StripeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
