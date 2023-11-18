import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Icon, MD3Colors } from 'react-native-paper';


const EventCard = ({event}) => {
    // TODO -> PRICES
    const navigation = useNavigation();
    
    const handleCardPress = () => {
        navigation.navigate('EventDetails', { event });
    };
    
    return (
        <TouchableOpacity onPress={handleCardPress}>
            <Card>
                <Card.Content style={styles.cardContent}>
                
                <Image style={styles.image} source={{ uri: event?.image }}/>
                
                <View style={styles.textContainer}>
                    <Text variant="titleLarge">{event?.name}</Text>
                    <Text variant="bodyMedium">{event?.creator?.name}</Text>
                    <Text variant="bodyMedium">{event?.location}</Text>
                    <Text variant="bodyMedium">€25 - 30</Text>
                </View>
                
                <View style={styles.arrowContainer}>
                    <Icon
                    source="chevron-right"
                    color="#FFFFFF"
                    size={40}
                    />
                </View>
                
                </Card.Content>
            </Card>
        </TouchableOpacity>   
    );
};

const styles = StyleSheet.create({
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    image: {
      width: 100,
      height: 100, 
    },
    textContainer: {
      marginLeft: 10,
      flexDirection: "column"
    },
    arrowContainer:{
        backgroundColor: "#3700B3",
        height: "100%",
        width: "15%",
    }
  });  

export default EventCard;
