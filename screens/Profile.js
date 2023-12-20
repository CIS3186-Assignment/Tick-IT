import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Icon } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import BottomNavBar from "../components/BottomNavBar";
import TransactionEntry from "../components/TransactionEntry";

import {
  getUserBookedEvents,
  fetchImagesForEvents,
} from "../services/ProfileService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (authUser) => {
      if (authUser) {
        setUser(authUser);

        try {
          const events = await getUserBookedEvents("T08aFSTUuGoc5yUdh9Sy"); // ToDo: Replace with real ID
          const eventsWithImages = await fetchImagesForEvents(events);
          setBookedEvents(eventsWithImages);
        } catch (error) {
          console.error("Error fetching booked events:", error);
        }
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Icon name="account" color="#fff" size={128} />
      <Text style={styles.text}>{user?.displayName}</Text>
      <Text style={styles.text}>User ID: {user?.uid}</Text> 
      <FlatList
        data={bookedEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionEntry item={item} />}
      />
      <BottomNavBar currentScreen="Profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#141414",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginTop: "2%",
  },
});

export default Profile;
