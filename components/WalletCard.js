import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card, IconButton, MD3Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const WalletCard = ({ event, imageURL }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("TicketDetails", { event, imageURL });
  };

  const goToEventCreator = () => {
    const creator = event.eventCreator;
    navigation.navigate("EventCreator", { creator });
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
              resizeMode="contain"
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.eventName} allowFontScaling={true}>{event?.name}</Text>
            {renderInfo("map-marker", event?.location)}
            {renderInfo(
              "account",
              event?.eventDetails?.eventCreator?.name,
              goToEventCreator
            )}

            {renderInfo("calendar", event?.datetime)}
            {renderInfo("currency-eur", event?.price)}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const renderInfo = (icon, text, onPress) => (
  <View style={styles.infoContainer}>
    <IconButton
      icon={icon}
      size={18}
      style={styles.iconButton}
      iconColor={MD3Colors.neutral100}
    />
    <TouchableOpacity 
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Go to ${text}`}>
      <Text style={styles.infoText} allowFontScaling={true}>{text}</Text>
    </TouchableOpacity>
  </View>
);

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
