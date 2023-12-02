import React from "react";
import {Text, View, StyleSheet, FlatList, Image } from "react-native";

const TicketCost = ({ticketKey, event, ticketCounts}) => {
    const quantity = ticketCounts[ticketKey];
    const price = event.tickets.find(ticket => ticket.name === ticketKey).price;

    return (
      <Text>
        {ticketKey} (${price}) x {quantity} = ${price * quantity}
      </Text>
    );
}

const PurchaseSummary = ({ totalAmount, event, ticketCounts }) => {
    return (
      <View>
        <Image style={styles.image} source={{ uri: event.imageURL }} />
        <Text style={styles.totalAmount}>{event.name}</Text>
        <FlatList
          data={Object.keys(ticketCounts)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <TicketCost ticketKey={item} event={event} ticketCounts={ticketCounts}/>}
        />
        <Text style={styles.totalAmount}>
          Total Amount: ${totalAmount.toFixed(2)}
        </Text>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 8,
    },
    cardField: {
      height: 40,
    },
    totalAmount: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
      color: "black"
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
  });

export default PurchaseSummary