import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  Linking,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import TopAppBar from "../components/TopAppBar";
import QRCode from "react-native-qrcode-svg";
import customTheme from "../theme";

const TicketQRCode = ({ route }) => {
  const { ticket, event, imageURL } = route.params;

  const navigation = useNavigation();

  const goToEventCreator = () => {
    creator = event.eventCreator
    navigation.navigate("EventCreator", { creator });
  }

  const openGoogleMaps = () => {
    const latitude = event.location_geopoint.latitude;
    const longitude = event.location_geopoint.longitude;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  }

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
            {imageURL && (
              <Image style={styles.image} source={{ uri: imageURL }} />
            )}
            <Text style={styles.header}>Your Ticket:</Text>
            <View style={styles.qrRow}>
              <QRCode
                value={ticket.id}
                style={styles.QRCode}
                size={200}
                color={customTheme.colors.tertiary}
              />
            </View>
          </View>
        }
        data={[
          {
            type: "grid",
            label: "Creator",
            value: event?.eventCreator?.name || "N/A",
          },
          {
            type: "grid",
            label: "Location",
            value: event?.eventCreator?.address,
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
                <Text style={styles.gridLabel} allowFontScaling={true}>
                  {item.label}:
                </Text>
                <View style={styles.gridValueContainer}>
                  {item.label === 'Creator' && (
                      <TouchableOpacity onPress={goToEventCreator}>
                      <Text style={styles.gridValue} allowFontScaling={true}>{item.value}</Text>
                      </TouchableOpacity>
                  )}
                  {item.label !== 'Creator' && (
                    <Text style={styles.gridValue} allowFontScaling={true}>{item.value}</Text>
                  )}
                  {item.withIcon && (
                    <IconButton
                      icon="map-marker"
                      size={35}
                      iconColor={customTheme.colors.error}
                      style={styles.iconButton}
                      accessibilityLabel="Location"
                      onPress={openGoogleMaps}
                    />
                  )}
                </View>
              </View>
            );
          }
          return null
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
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20,
    color: customTheme.colors.onPrimary,
  },
});

export default TicketQRCode;
