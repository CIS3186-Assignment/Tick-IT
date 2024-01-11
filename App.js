import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomNavigation, Text, IconButton } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as Notifications from "expo-notifications";

import BottomNavBar from "./components/Navbar";
import customTheme from "./theme";
import EventDetails from "./screens/EventDetails";
import EventCatalog from "./screens/EventCatalog";
import Profile from "./screens/Profile";
import Wallet from "./screens/Wallet";
import EventCreator from "./screens/EventCreator";
import Checkout from "./screens/Checkout";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Receipt from "./screens/Receipt";
import TicketQRCode from "./screens/TicketQRCode";
import NotificationHandler from "./components/NotificationHandler";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "eventCatalog", title: "Events", icon: "home", color: customTheme.colors.primary },
    { key: "wallet", title: "Wallet", icon: "account-balance-wallet", color: "#795548" },
    { key: "profile", title: "Profile", icon: "account-circle", color: "#673ab7" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "eventCatalog":
        return <EventCatalog />;
      case "wallet":
        return <Wallet />;
      case "profile":
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={customTheme}>
        <StripeProvider
          publishableKey="pk_test_51OFjR5KpbrGf79n9xGCl9UmhH9Jw7UrNw4bfk6SwS7d4OlQp2AEwKM4jMfTMWksqYH1P4ITDdxYE6UbwKYpQiaCv00mMs543VC"
        >
          <NavigationContainer>
            <NotificationHandler />
            <BottomNavBar
              navigationState={{ index, routes }}
              onIndexChange={setIndex}
              renderScene={renderScene}
            />
          </NavigationContainer>
        </StripeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
