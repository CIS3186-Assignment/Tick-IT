import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { IconButton, MD3Colors } from "react-native-paper";

const EventCard = ({ event, imageURL }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("EventDetails", { event });
  };

  const goToEventCreator = () => {
    creator = event.eventCreator
    navigation.navigate("EventCreator", { creator });
  }

  const getPriceRange = () => {
    let prices = event.tickets.map((ticket) => ticket.price);
    let max = Math.max(...prices);
    let min = Math.min(...prices);
    let minTxt, maxTxt;

    if (min === 0) {
      minTxt = "Free";
      maxTxt = `${max}`;
    } else {
      minTxt = `${min}`;
      maxTxt = `${max}`;
    }

    if (min === max) return minTxt;
    return `${minTxt} - ${maxTxt}`;
  };

  return (
    <TouchableOpacity 
      onPress={handleCardPress}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${event.name}`}>
      <Card style={styles.cardContent}>
        <Card.Content style={styles.content}>
          {imageURL && (
            <Image
              style={styles.image}
              source={{ uri: imageURL }}
              accessibilityLabel="Event Image"
              resizeMode={Platform.OS === 'ios' ? 'cover' : 'contain'}
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.eventName} allowFontScaling={true}>{event?.name}</Text>
            <View style={styles.infoContainer}>
              <IconButton
                icon="map-marker"
                size={18}
                style={styles.iconButton}
                iconColor={MD3Colors.neutral100}
                accessibilityLabel="Event location"
              />
              <Text style={styles.infoText} allowFontScaling={true}>{event?.location_name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <IconButton
                icon="account"
                size={18}
                style={styles.iconButton}
                iconColor={MD3Colors.neutral100}
                accessibilityLabel="Event creator"
              />
              <TouchableOpacity 
                onPress={goToEventCreator}
                accessibilityRole="link"
                accessibilityLabel={`View details for ${event.eventCreator.name}`}>
                <Text style={styles.infoText} allowFontScaling={true}>{event?.eventCreator?.name}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
              <IconButton
                icon="currency-eur"
                size={18}
                style={styles.iconButton}
                iconColor={MD3Colors.neutral100}
                accessibilityLabel="Event price range"
              />
              <Text style={styles.infoText} allowFontScaling={true}>{getPriceRange()}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    marginVertical: 15,
    marginHorizontal: 0,
    borderTopWidth: 0.3,
    borderBottomWidth: 0.4,
    borderColor: "white",
    borderRadius: 0,
    backgroundColor: "#253354",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 240,
  },
  image: {
    width: "45%",
    height: "100%",
    borderRadius: 10,
    right: 5,
    backgroundColor: "#aaa",
  },
  textContainer: {
    flex: 1,
    marginTop: 5,
    marginLeft: 4,
    marginRight: 5,
    flexDirection: "column",
  },
  eventName: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: -1,
  },
  iconButton: {
    marginRight: -2,
    marginLeft: -10,
  },
  infoText: {
    color: "white",
    fontSize: 15,
  },
});

export default EventCard;
