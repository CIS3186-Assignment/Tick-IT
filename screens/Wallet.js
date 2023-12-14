import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { getUserBookedEvents } from "../services/WalletService";
import { fetchImagesForEvents } from "../services/WalletService";
import BottomNavBar from "../components/BottomNavBar";
import WalletCard from "../components/WalletCard";

const Wallet = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [lastRenderedDate, setLastRenderedDate] = useState(null);

  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        const userId = "T08aFSTUuGoc5yUdh9Sy"; // ToDo: Replace with the actual user ID
        const events = await getUserBookedEvents(userId);

        const eventsWithImages = await fetchImagesForEvents(events);

        setBookedEvents(eventsWithImages);
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
            {item.eventDetails.map((ticket, index) => {
              const imageURL = ticket.imageURL || "";
              const eventName = ticket.eventDetails?.name || "Event Name";
              const eventCreatorName =
                ticket.eventDetails?.eventCreator?.name || "Event Creator";
              const eventDescription =
                ticket.eventDetails?.description || "Event Description";
              const eventLocation =
                ticket.eventDetails?.location_name || "Event Location";

              const eventDatetime = ticket.eventDetails?.date?.seconds || 0;

              const dateObject = new Date(eventDatetime * 1000);

              const formattedDate = `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`;

              const showDate = lastRenderedDate !== formattedDate;

              if (showDate) {
                setLastRenderedDate(formattedDate);
                return <Text style={styles.dateText}>{formattedDate}</Text>;
              }

              return (
                <WalletCard
                  key={ticket.id}
                  event={{
                    name: eventName,
                    eventDetails: {
                      eventCreator: {
                        name: eventCreatorName,
                      },
                    },
                    description: eventDescription,
                    location: eventLocation,
                    datetime: formattedDate,
                    price: ticket.price || "Event Price",
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
  eventCard: {
    marginBottom: 0,
  },
  dateText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 15,
  },
});

export default Wallet;
