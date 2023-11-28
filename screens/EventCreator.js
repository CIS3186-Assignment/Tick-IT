import React from 'react';
import { View, StyleSheet, Linking} from 'react-native';
import { Text, Button } from "react-native-paper";

import TopAppBar from '../components/TopAppBar';

const EventCreator = ({ route }) => {
    const {creator} = route.params;

    const callPhone = async () => {
        try {
            const canOpen = await Linking.canOpenURL("tel:" + creator.phone);
            if (canOpen) {
                await Linking.openURL("tel:" + creator.phone);
            } else {
                console.error("Cannot open phone app.");
            }
        } catch (error) {
            console.error("Error opening phone app:", error);
        }
    };
    
    const openEmail = async () => {
        try {
            const canOpen = await Linking.canOpenURL("mailto:" + creator.email);
            if (canOpen) {
                await Linking.openURL("mailto:" + creator.email);
            } else {
                console.error("Cannot open email app.");
            }
        } catch (error) {
            console.error("Error opening email app:", error);
        }
    };

    return (
        <View style={{ flex: 1, position: 'relative', backgroundColor: '#141414'}}>

        <View style={{ flex: 1 }}>
            <TopAppBar title={creator.name}/>
            {/* <Text style={styles.test}>Name: {creator.name}</Text>
            <Text style={styles.test}>Address: {creator.address}</Text>
            <Text style={styles.test}>Phone Number: {creator.phone}</Text>
            <Text style={styles.test}>Email Address: {creator.email}</Text> */}
            <View>
                <Text style={styles.test}>Phone Number: {creator.phone}</Text>
                <Button mode="contained" icon="phone" onPress={callPhone}>Call</Button>
                <Button></Button>
                <Button mode="contained" icon="email" onPress={openEmail}>Send an Email</Button>
            </View>
        </View>
        </View>
    );
};


const styles = StyleSheet.create({
  test: {
    color: '#fff',
    textAlign: 'center',
    marginTop: '100%' 
  }
});

export default EventCreator;