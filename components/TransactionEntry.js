import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import customTheme from "../theme";

const TransactionEntry = ({ item }) => {
  console.log(item.eventDetails);

  // Group tickets by event name
  const groupedEventDetails = item.eventDetails.reduce((acc, curr) => {
    acc[curr.eventDetails.name] = (acc[curr.eventDetails.name] || 0) + 1;
    return acc;
  }, {});

  return (
    <View style={styles.entryContainer}>
      {Object.entries(groupedEventDetails).map(([eventName, count], index) => {
        return (
          <View key={index} style={styles.detailContainer}>
            <Image
              style={styles.image}
              source={{ uri: item.eventDetails[0].eventDetails.image }}
            />
            <Text style={styles.text}>
              {eventName} (x{count})
            </Text>
            
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingLeft: 10,
    backgroundColor: customTheme.colors.background,
    borderTopWidth: 1,
    borderColor: customTheme.colors.primary,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  text: {
    color: customTheme.colors.onPrimary,
    paddingHorizontal: 5,
    marginLeft: 10, 
  },
  image: {
    backgroundColor: customTheme.colors.primary,
    width: 50, 
    height: 50, 
    borderRadius: 10, 
  },
});

export default TransactionEntry;