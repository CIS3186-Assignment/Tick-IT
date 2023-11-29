import React from 'react';
import { Button, Text, View, StyleSheet} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import PurchaseSummary from '../components/PurchaseSummary';


const Receipt = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { totalAmount, event, ticketCounts } = route.params;
    
    

    return (
        <View style={{ flex: 1, position: 'relative', backgroundColor: '#141414'}}>
        <View style={{ flex: 1 }}>
            <Text>Purchase completed successfully!</Text>
            <PurchaseSummary totalAmount={totalAmount} event={event} ticketCounts={ticketCounts}/>
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