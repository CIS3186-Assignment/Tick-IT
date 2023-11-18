import React from "react";
import { View, Text } from "react-native";
import BottomNavBar from "../components/BottomNavBar";

const Wallet = () => {
  return (
    <View>
      <Text>This is the Wallet Screen</Text>
      <BottomNavBar currentScreen="Wallet" />
    </View>
  );
};

export default Wallet;
