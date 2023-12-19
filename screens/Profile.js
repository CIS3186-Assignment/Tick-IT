import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { Icon } from "react-native-paper";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
  getUserBookedEvents,
  fetchImagesForEvents,
} from "../services/ProfileService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      if (authUser) {
        setUser(authUser);

        getUserBookedEvents("T08aFSTUuGoc5yUdh9Sy") //ToDo replace with real ID
          .then(async (events) => {
            const eventsWithImages = await fetchImagesForEvents(events);
            setBookedEvents(eventsWithImages);
          })
          .catch((error) => {
            console.error("Error fetching booked events:", error);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "#141414" }}>
      <Icon name="account" color="#fff" size={128} />
      <Text style={styles.test}>{user?.displayName}</Text>
      <Text style={styles.test}>User ID: {user?.uid}</Text>
      <FlatList
        data={bookedEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            {item.imageURL && (
              <Image
                source={{ uri: item.imageURL }}
                style={{ width: 100, height: 100 }}
              />
            )}
          </View>
        )}
      />
      <BottomNavBar currentScreen="Profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    color: "#fff",
    textAlign: "center",
    marginTop: "2%",
  },
});

export default Profile;
