import React from 'react';
import { Button, Text, View, StyleSheet} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import PurchaseSummary from '../components/PurchaseSummary';
import customTheme from '../theme';


const Receipt = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { totalAmount, event, ticketCounts } = route.params;
    
    

    return (
        <View style={{ flex: 1, position: 'relative', backgroundColor: customTheme.colors.background, paddingTop: 50}}>
        <View style={{ flex: 1 }}>
            <PurchaseSummary totalAmount={totalAmount} event={event} ticketCounts={ticketCounts}/>
            <Text allowFontScaling={true} style={styles.receiptText}>Purchase completed successfully!</Text>
            <View style={styles.buttonarea}>
              <Button
                style={styles.goBack}
                onPress={() => navigation.navigate("EventCatalog")}
                title="Go back to Catalog"
                accessibilityLabel="Go back to Catalog"
              />
            </View>
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
    goBack: {
      padding: 10,
      borderRadius: 35,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginHorizontal: 20,
    },
    receiptText: {
        fontSize: 20,
        marginTop: '10%',
        marginBottom: 20,
        textAlign: "center",
        color: customTheme.colors.primary,
    },
    buttonarea: {
      marginHorizontal: 50,
      marginBottom: 20,
      textAlign: "center",
      color: customTheme.colors.primary,
    }
  });

export default Receipt;