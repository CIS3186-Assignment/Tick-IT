import React from "react";
import {Text, View, StyleSheet, FlatList, Image, KeyboardAvoidingView } from "react-native";
import customTheme from "../theme";

const TicketCost = ({ticketKey, event, ticketCounts}) => {
    const quantity = ticketCounts[ticketKey];
    const price = event.tickets.find(ticket => ticket.name === ticketKey).price;

    return (
      <Text style={styles.ticketSum} allowFontScaling={true}>
        {ticketKey} (${price}) x {quantity} = ${price * quantity}
      </Text>
    );
}

const PurchaseSummary = ({ totalAmount, event, ticketCounts }) => {
    return (
      <View>
        <View style={styles.imageSection}>
          <Image style={styles.image} source={{ uri: event.imageURL }} accessibilityLabel={`Event Image: ${event.name}`}/>
        </View>
        <View style={styles.ticketTotals}>
        <Text style={styles.order} accessibilityLabel="Your Order" allowFontScaling={true}>Your Order:</Text>
        {Object.keys(ticketCounts).map((ticketKey) => (
          <TicketCost key={ticketKey} ticketKey={ticketKey} event={event} ticketCounts={ticketCounts} />
        ))}
        <View style={styles.divider}></View>
        <Text style={styles.totalAmount} accessibilityLabel={`Total Amount: $${totalAmount.toFixed(2)}`} allowFontScaling={true}>
          Total Amount: ${totalAmount.toFixed(2)}
        </Text>
        </View>
      </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 8,
      backgroundColor: customTheme.colors.background,
    },
    cardField: {
      height: 40,
    },
    totalAmount: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      color: customTheme.colors.onPrimary,
      textAlign: "left"
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
    imageSection: {
      backgroundColor: customTheme.colors.background,
      borderBottomWidth: 2.5,
      borderColor: customTheme.colors.onPrimary,
    },
    ticketSum:{
      fontSize: 16,
      marginBottom: 20,
      color: customTheme.colors.onPrimary,
      textAlign: "left"
    },
    ticketTotals:{
      paddingTop: 20,
      paddingLeft: 35,
      backgroundColor: customTheme.colors.background,
    },
    order:{
      color: customTheme.colors.onPrimary,
      textAlign: "left",
      marginBottom: 20,
      fontSize: 16,
      textDecorationLine: 'underline',
      textDecorationColor: customTheme.colors.onPrimary,
      textDecorationStyle: 'solid'
    },
    divider:{
      borderBottomWidth: 2,
      marginBottom: 10,
      borderBlockColor: customTheme.colors.onPrimary,
      marginRight: 125
    } 
  });

export default PurchaseSummary