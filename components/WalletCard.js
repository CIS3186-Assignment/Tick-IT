import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import customTheme from "../theme";

const WalletCard = ({ event, imageURL, ticket }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("TicketQRCode", {
      ticket,
      event,
      imageURL,
    });
  };

  return (
    <TouchableOpacity
      onPress={handleCardPress}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${event.name}`}
    >
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
    backgroundColor: customTheme.colors.background,
    borderRadius: 10,
    width: "90%",
    aspectRatio: 1,
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },
});

export default WalletCard;
