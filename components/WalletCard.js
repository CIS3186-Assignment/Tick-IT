import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { IconButton, MD3Colors } from "react-native-paper";

const WalletCard = ({ event, image }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("TicketDetails", { event });
  };

  const goToEventCreator = () => {
    creator = event.creator
    navigation.navigate("EventCreator", { creator });
  }

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <Card style={styles.cardContent}>
        <Card.Content style={styles.content}>
          {event?.image && (
            <Image
              style={styles.image}
              source={{ uri: event.image }}
              resizeMode="contain"
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.eventName}>{event?.name}</Text>
            <View style={styles.infoContainer}>
              <IconButton
                icon="map-marker"
                size={18}
                style={styles.iconButton}
                iconColor={MD3Colors.neutral100}
              />
              <Text style={styles.infoText}>{event?.location}</Text>
            </View>
            <View style={styles.infoContainer}>
              <IconButton
                icon="account"
                size={18}
                style={styles.iconButton}
                iconColor={MD3Colors.neutral100}
              />
              <TouchableOpacity onPress={goToEventCreator}>
                <Text style={styles.infoText}>{event?.creator?.name}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
              <IconButton
                icon="currency-eur"
                size={18}
                style={styles.iconButton}
                iconColor={MD3Colors.neutral100}
              />
              <Text style={styles.infoText}>{event?.price}</Text>
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

export default WalletCard;
