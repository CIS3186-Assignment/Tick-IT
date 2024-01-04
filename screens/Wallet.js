import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { getUserBookedEvents } from "../services/WalletService";
import { fetchImagesForEvents } from "../services/WalletService";
import BottomNavBar from "../components/BottomNavBar";
import WalletCard from "../components/WalletCard";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import customTheme from "../theme";

const Wallet = ({ navigation }) => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numColumns, setNumColumns] = useState(2);
  const [isLoggedin, setIsLoggedin] = useState(
    FIREBASE_AUTH.currentUser != null
  );

  FIREBASE_AUTH.onAuthStateChanged((user) => {
    if (user) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  });

  useEffect(() => {
    const fetchBookedEvents = async () => {
      setIsLoading(true);
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

    if (isLoggedin) fetchBookedEvents();
  }, [isLoggedin]);

  const handleCardPress = (item) => {
    navigation.navigate("TicketQRCode", {
      ticket: item,
      event: item.eventDetails, // Assuming eventDetails contains the necessary event information
      imageURL: item.imageURL || "",
    });
  };

  const renderWalletCard = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleCardPress(item)}
      style={styles.cardContainer}
    >
      <WalletCard
        accessibilityLabel={`Event Card for ${item.name}`}
        event={item.eventDetails} // Assuming eventDetails contains the necessary event information
        imageURL={item.imageURL || ""}
        ticket={item}
      />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={customTheme.colors.onPrimary}
          />
        </View>
        <View style={styles.bottomNavBarContainer}>
          <BottomNavBar currentScreen="Wallet" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Tickets</Text>
      {!isLoggedin ? (
        <>
          <Text style={styles.messageText}>
            Please login to view your tickets.
          </Text>
          <Button onPress={() => navigation.push("Login", { required: true })}>
            <Text>Login</Text>
          </Button>
        </>
      ) : bookedEvents.length === 0 ? (
        <Text style={styles.messageText}>
          You have no tickets in your wallet.
        </Text>
      ) : (
        <FlatList
          data={bookedEvents.flatMap((event) => event.eventDetails)}
          style={styles.imageGrid}
          renderItem={renderWalletCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      )}
      <View style={styles.bottomNavBarContainer}>
        <BottomNavBar currentScreen="Wallet" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customTheme.colors.background,
    paddingTop: 30,
  },
  headerText: {
    color: customTheme.colors.onPrimary,
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
  cardContainer: {
    flex: 1,
    width: "50%",
  },
  messageText: {
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    marginVertical: "50%",
    color: customTheme.colors.onPrimary,
    fontSize: 20,
  },
  bottomNavBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default Wallet;
