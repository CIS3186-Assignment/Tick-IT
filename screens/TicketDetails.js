import React, { useState } from "react";
import { View, Image, StyleSheet, FlatList, Text,TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, MD3Colors } from "react-native-paper";
import TopAppBar from "../components/TopAppBar";

const TicketDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  console.log(event);

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "N/A";
    }

    const date = new Date(timestamp.toDate());
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  return (
    <View style={styles.container}>
      <TopAppBar title={event.name} />

      <FlatList
        ListHeaderComponent={
          <View style={styles.imageContainer}>
            {event.image && (
              <Image style={styles.image} source={{ uri: event.image }} />
            )}
          </View>
        }
        data={[
          { type: "grid", label: "Creator", value: event.creator.name },
          {
            type: "grid",
            label: "Location",
            value: event.location,
            withIcon: true,
          },
          {
            type: "grid",
            label: "Date and Time",
            value: formatDate(event.date),
          },
          { type: "grid", label: "Description", value: event.description },
          { type: "button" },
        ]}
        renderItem={({ item }) => {
          if (item.type === "grid") {
            return (
              <View style={styles.gridRow}>
                <Text style={styles.gridLabel}>{item.label}:</Text>
                <View style={styles.gridValueContainer}>
                  <Text style={styles.gridValue}>{item.value}</Text>
                  {item.withIcon && (
                    <IconButton
                      icon="map-marker"
                      size={35}
                      iconColor={MD3Colors.error60}
                      style={styles.iconButton}
                    />
                  )}
                </View>
              </View>
            );
          } 
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "70%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 25,
    marginVertical: 20,
    backgroundColor: "#bbe",
    alignSelf: "center",
  },
  gridRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 10,
    paddingLeft: 30,
    paddingRight: 20,
  },
  gridLabel: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  gridValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  gridValue: {
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 5,
    flexWrap: "wrap",
  },
  iconButton: {
    margin: -10,
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  ticketContainer: {
    borderColor: "#253354",
    borderTopWidth: 1.5,
    marginVertical: 0,
    marginBottom: 0,
    backgroundColor: "#fff",
    marginTop: 30,
    marginBottom: -30,
  },
  ticketRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 25,
    marginBottom: 20,
  },
  ticketLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ticketCountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticketCount: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: "#253354",
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 45,
    marginBottom: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  total: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 60,
    marginBottom: 20,
    color: "#fff",
  },
});

export default TicketDetails;