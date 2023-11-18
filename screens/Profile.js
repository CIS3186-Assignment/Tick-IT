import React from "react";
import { View, Text } from "react-native";
import BottomNavBar from "../Components/BottomNavBar";

BottomNavBar;
const Profile = () => {
  return (
    <View>
      <Text>This is the Profile Screen</Text>
      <BottomNavBar currentScreen="Profile" />
    </View>
  );
};

export default Profile;
