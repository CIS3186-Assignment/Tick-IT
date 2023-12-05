import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import BottomNavBar from "../components/BottomNavBar";
import WalletCard from "../components/WalletCard";
import { getUserBookedEvents } from "../services/WalletService";

const Wallet = () => {
  const [value, setValue] = React.useState("");
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        const userId = "T08aFSTUuGoc5yUdh9Sy"; // ToDo: Replace with the actual user ID
        const events = await getUserBookedEvents(userId);
        setBookedEvents(events);
      } catch (error) {
        console.error("Error fetching booked events:", error);
      }
    };

    fetchBookedEvents();
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: "#141414" }}>
      <FlatList
        data={bookedEvents}
        keyExtractor={(item) => item.id}
        style={styles.eventCard}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <>
            {item.eventDetails.map((ticket) => {
              const imageURL = ticket.eventDetails?.image || "";
              const eventName = ticket.eventDetails?.name || "Event Name";
              const eventDescription =
                ticket.eventDetails?.description || "Event Description";
              const eventLocation =
                ticket.eventDetails?.location_name || "Event Location";
              const eventDatetime =
                ticket.eventDetails?.date || "Event Date & Time";
              const eventPrice = ticket.price || "Event Price";

              return (
                <WalletCard
                  key={ticket.id}
                  event={{
                    name: eventName,
                    description: eventDescription,
                    location: eventLocation,
                    datetime: eventDatetime,
                    price: eventPrice,
                  }}
                  imageURL={imageURL}
                />
              );
            })}
          </>
        )}
      />
      <BottomNavBar currentScreen="Wallet" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  segmentedButtons: {
    marginTop: 55,
    marginHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  eventCard: {
    marginBottom: 0,
  },
});

export default Wallet;
