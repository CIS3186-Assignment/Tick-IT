import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import TopAppBar from "../components/TopAppBar";
import customTheme from "../theme.js";

const EventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  const details = event.details || {};

  useEffect(() => {
    console.log(event);
  }, []);

  const [ticketCounts, setTicketCounts] = useState({});

  const handleTicketCountChange = (ticketType, change) => {
    const currentCount = ticketCounts[ticketType] || 0;
    const newCount = Math.max(0, currentCount + change);

    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [ticketType]: newCount,
    }));
  };

  const isAnyTicketSelected = Object.values(ticketCounts).some(
    (count) => count > 0
  );
  
  const openGoogleMaps = () => {
    const latitude = event.location_geopoint.latitude;
    const longitude = event.location_geopoint.longitude;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  }

  const handlePurchasePress = () => {
    const isAnyTicketSelected = Object.values(ticketCounts).some(
      (count) => count > 0
    );

    if (isAnyTicketSelected) {
      const totalAmount = event.tickets.reduce(
        (total, ticket) =>
          total + (ticketCounts[ticket.name] || 0) * ticket.price,
        0
      );

      navigation.navigate("Checkout", {
        event,
        ticketCounts,
        totalAmount,
      });
    } else {
      alert("Please select at least one ticket before purchasing.");
    }
  };

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
            {event.imageURL && (
              <Image style={styles.image} source={{ uri: event.imageURL }} />
            )}
          </View>
        }
        ListFooterComponent={
          <View>
            <Text style={styles.total} allowFontScaling={true}>
              {`Total: €${event.tickets.reduce(
                (total, ticket) =>
                  total + (ticketCounts[ticket.name] || 0) * ticket.price,
                0
              )}`}
            </Text>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                !isAnyTicketSelected && styles.buttonDisabled
              ]}
              onPress={isAnyTicketSelected ? handlePurchasePress : null}
            >
              <Text style={styles.buttonText} allowFontScaling={true}>Purchase</Text>
            </TouchableOpacity>
          </View>
        }
        data={[
          { type: "grid", label: "Creator", value: event.eventCreator.name },
          {
            type: "grid",
            label: "Location",
            value: event.location_name,
            withIcon: true,
          },
          {
            type: "grid",
            label: "Date and Time",
            value: formatDate(event.date),
          },
          { type: "grid", label: "Description", value: event.description },
          ...event.tickets.map((ticket) => ({ type: "ticket", ...ticket })),
          { type: "button" },
        ]}
        renderItem={({ item }) => {
          if (item.type === "grid") {
            return (
              <View style={styles.gridRow}>
                <Text style={styles.gridLabel} allowFontScaling={true}>{item.label}:</Text>
                <View style={styles.gridValueContainer}>
                  <Text style={styles.gridValue} allowFontScaling={true}>{item.value}</Text>
                  {item.withIcon && (
                    <IconButton
                      icon="map-marker"
                      size={35}
                      style={styles.iconButton}
                      iconColor={customTheme.colors.error}
                      onPress={openGoogleMaps}
                      accessibilityLabel="Open Google Maps"
                    />
                  )}
                </View>
              </View>
            );
          } else if (item.type === "ticket") {
            return (
              <View style={styles.ticketContainer}>
                <View style={styles.ticketRow}>
                  <Text style={styles.ticketLabel} allowFontScaling={true}>
                    {item.name} (€{item.price})
                  </Text>
                  <View style={styles.ticketCountContainer}>
                    <IconButton
                      icon="minus"
                      size={35}
                      style={styles.iconButton}
                      onPress={() => handleTicketCountChange(item.name, -1)}
                      accessibilityLabel={`Decrease ${item.name} count`}
                    />
                    <Text style={styles.ticketCount} allowFontScaling={true}>
                      {ticketCounts[item.name] || 0}
                    </Text>
                    <IconButton
                      icon="plus"
                      size={35}
                      style={styles.iconButton}
                      onPress={() => handleTicketCountChange(item.name, 1)}
                      accessibilityLabel={`Increase ${item.name} count`}
                    />
                  </View>
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
    backgroundColor: customTheme.colors.background,
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
    backgroundColor: customTheme.colors.tertiary,
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
    color: customTheme.colors.onPrimary,
    marginBottom: 5,
  },
  gridValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  gridValue: {
    fontSize: 16,
    color: customTheme.colors.onPrimary,
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
    color: customTheme.colors.onPrimary,
  },
  ticketContainer: {
    borderColor: customTheme.colors.background,
    borderTopWidth: 1.5,
    marginVertical: 0,
    marginBottom: 0,
    backgroundColor: customTheme.colors.onPrimary,
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
    backgroundColor: customTheme.colors.primary,
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 45,
    marginBottom: 30,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: customTheme.colors.disabled,
    display: 'none',
  },
  buttonText: {
    color: customTheme.colors.onPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  total: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 60,
    marginBottom: 20,
    color: customTheme.colors.onPrimary,
  },
});

export default EventDetails;
