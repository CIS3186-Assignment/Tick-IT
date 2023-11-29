import React from 'react';
import { Button, Text, View, StyleSheet, Alert, FlatList, Image } from "react-native";
import BottomNavBar from '../components/BottomNavBar';
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";


const Receipt = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { totalAmount, event, ticketCounts } = route.params;
    
    const TicketCost = ({ticketKey}) => {
        const quantity = ticketCounts[ticketKey];
        const price = event.tickets.find(ticket => ticket.name === ticketKey).price;
    
        return (
          <Text>
            {ticketKey} (${price}) x {quantity} = ${price * quantity}
          </Text>
        );
    }

    return (
        <View style={{ flex: 1, position: 'relative', backgroundColor: '#141414'}}>
        <View style={{ flex: 1 }}>
            <Text>Purchase completed successfully!</Text>
            <Image style={styles.image} source={{ uri: event.imageURL }} />
            <Text>{event.name}</Text>
            <FlatList
            data = {Object.keys(ticketCounts)}
            keyExtractor={item => item}
            renderItem={({item}) => <TicketCost ticketKey={item}/>}
            />
            <Text style={styles.totalAmount}>
            Total Amount: ${totalAmount.toFixed(2)}
            </Text>
            <Button
            onPress={() => navigation.navigate("EventCatalog")}
            title="Go back to Catalog"
            />
            </View>
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

export default Receipt;