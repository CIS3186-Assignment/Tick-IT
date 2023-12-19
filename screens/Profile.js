import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { Icon } from "react-native-paper";
import { onAuthStateChanged, currentUser } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "#141414" }}>
      <Icon name="account" color="#fff" size={128} />
      <Text style={styles.test}>{user?.displayName}</Text>
      <FlatList
      // Add your FlatList props and content here
      />
      <View style={{ flex: 1 }}>{/* Add your FlatList content here */}</View>
      <BottomNavBar currentScreen="Profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    color: "#fff",
    textAlign: "center",
    marginTop: "100%",
  },
});

export default Profile;
