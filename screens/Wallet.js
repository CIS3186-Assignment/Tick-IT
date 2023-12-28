import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, IconButton, MD3Colors } from "react-native-paper";
import { getUserBookedEvents } from "../services/WalletService";
import { fetchImagesForEvents } from "../services/WalletService";
import BottomNavBar from "../components/BottomNavBar";
import WalletCard from "../components/WalletCard";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const Wallet = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numColumns, setNumColumns] = useState(2);

  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        const userId = FIREBASE_AUTH.currentUser.uid;
        const events = await getUserBookedEvents(userId);
        const eventsWithImages = await fetchImagesForEvents(events);
        setBookedEvents(eventsWithImages);
      } catch (error) {
        console.error("Error fetching booked events:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBookedEvents();
  }, []);
  
  const renderWalletCard = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleCardPress(item)}
      style={styles.cardContainer}
    >
      <WalletCard event={{}} imageURL={item.imageURL || ""} ticket={item} />
    </TouchableOpacity>
  );
  
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" color="#FFFFFF" />
        </View>
        <View style={styles.bottomNavBarContainer}>
          <BottomNavBar currentScreen="Wallet"/>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Tickets</Text>
      {bookedEvents.length === 0 ? (
        <Text style={styles.messageText}>You have no tickets in your wallet.</Text>
      ) : (
        <FlatList
          data={bookedEvents.flatMap(event => event.eventDetails)}
          style={styles.imageGrid}
          renderItem={renderWalletCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      )}
      <View style={styles.bottomNavBarContainer}>
      <BottomNavBar currentScreen="Wallet"/>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  imageGrid: {
    margin: 10,
    marginBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  cardContainer: {
    flex: 1,
    width: "50%", 
  },
  toggleButton: {
    backgroundColor: "#253354",
    borderRadius: 15,
    right: 10,
  },
  messageText: {
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    marginVertical: '50%',
    color: "#FFFFFF",
    fontSize: 20,
  },
  bottomNavBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default Wallet;
