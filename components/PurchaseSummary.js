import React from "react";
import {Text, View, StyleSheet, FlatList, Image, KeyboardAvoidingView } from "react-native";
import TopAppBar from "../components/TopAppBar";

const TicketCost = ({ticketKey, event, ticketCounts}) => {
    const quantity = ticketCounts[ticketKey];
    const price = event.tickets.find(ticket => ticket.name === ticketKey).price;

    return (
      <Text style={styles.ticketSum}>
        {ticketKey} (${price}) x {quantity} = ${price * quantity}
      </Text>
    );
}

const PurchaseSummary = ({ totalAmount, event, ticketCounts }) => {
    return (
      <View>
        <View style={styles.imageSection}>
        <TopAppBar title={event.name}/>
          <Image style={styles.image} source={{ uri: event.imageURL }} />
        </View>
        <View style={styles.ticketTotals}>
        <Text style={styles.order}>Your Order:</Text>
          <FlatList
          data={Object.keys(ticketCounts)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <TicketCost ticketKey={item} event={event} ticketCounts={ticketCounts}/>}
        />
        <View style={styles.divider}></View>
        <Text style={styles.totalAmount}>
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
      backgroundColor: "#141414",
    },
    cardField: {
      height: 40,
    },
    totalAmount: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      color: "white",
      textAlign: "left"
    },
    image: {
      width: "70%",
      height: 300,
      resizeMode: "cover",
      borderRadius: 25,
      marginVertical: 20,
      backgroundColor: "#141414",
      alignSelf: "center",
    },
    imageSection: {
      marginTop: 25,
      backgroundColor: '#141414',
      borderBottomWidth: 2.5,
      borderColor: '#fff',
    },
    ticketSum:{
      fontSize: 16,
      marginBottom: 20,
      color: "white",
      textAlign: "left"
    },
    ticketTotals:{
      paddingTop: 20,
      paddingLeft: 35,
      backgroundColor: '#141414'
    },
    order:{
      color: '#fff',
      textAlign: "left",
      marginBottom: 20,
      fontSize: 16,
      textDecorationLine: 'underline',
      textDecorationColor: '#fff',
      textDecorationStyle: 'solid'
    },
    divider:{
      borderBottomWidth: 2,
      marginBottom: 10,
      borderBlockColor: '#fff',
      marginRight: 140
    } 
  });

export default PurchaseSummary