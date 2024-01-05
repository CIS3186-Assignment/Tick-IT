import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TransactionEntry = ({ item }) => {
  console.log(item.eventDetails);
  return (
    <View style={styles.entryContainer}>
      <Text style={styles.text}>Booking ID: {item.id}</Text>

      {item.eventDetails.map((eventDetail, index) => {
        return (
          <View key={eventDetail.id} style={styles.detailContainer}>
            <Text style={styles.text}>Booking Ticket ID: {eventDetail.id}</Text>
            <Text style={styles.text}>
              Event Name: {eventDetail.eventDetails.name}
            </Text>
            <Text style={styles.text}>
              Event Description: {eventDetail.eventDetails.description}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  text: {
    color: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
});

export default TransactionEntry;
