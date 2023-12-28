import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const WalletCard = ({ event, imageURL, ticket }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("TicketQRCode", {
      ticket,
      event,
      imageURL,
    });
  };

  const goToEventCreator = () => {
    const creator = event.eventCreator;
    navigation.navigate("EventCreator", { creator });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.cardContainer}>
        <Card style={styles.cardContent}>
          <Image
            style={styles.image}
            source={{ uri: imageURL }}
            resizeMode="contain"
          />
        </Card>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    backgroundColor: "#141414",
    borderRadius: 10,
    overflow: "hidden",
    width: "90%", 
    aspectRatio: 1, 
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default WalletCard;
