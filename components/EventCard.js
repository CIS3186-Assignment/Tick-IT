import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { IconButton, MD3Colors } from 'react-native-paper';

const EventCard = ({ event }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('EventDetails', { event });
  };
  
  const getPriceRange = () => {
        let prices = event.tickets.map(ticket => ticket.price);
        let max = Math.max(...prices);
        let min = Math.min(...prices);
        let minTxt, maxTxt;
      
        if (min === 0) {
          minTxt = "Free";
          maxTxt = `€${max}`;
        } else {
          minTxt = `€${min}`;
          maxTxt = `€${max}`;
        }
      
        if (min === max) return minTxt;
        return `${minTxt} - ${maxTxt}`;
      };
  

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <Card style={styles.cardContent}>
        <Card.Content style={styles.content}>
          <Image style={styles.image} source={{ uri: event?.image }} />
          <View style={styles.textContainer}>
            <Text style={styles.eventName}>{event?.name}</Text>
            <View style={styles.infoContainer}>
              <IconButton
                icon="map-marker"
                size={18}
                style={styles.iconButton}
                color="white"
              />
              <Text style={styles.infoText}>{event?.location_name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <IconButton
                icon="account"
                size={18}
                style={styles.iconButton}
                color="white"
              />
              <Text style={styles.infoText}>{event?.eventCreator?.name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <IconButton
                icon="currency-eur"
                size={18}
                style={styles.iconButton}
                color="white"
              />
              <Text style={styles.infoText}>{getPriceRange()}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    marginVertical: 15,
    marginHorizontal: -5,
    borderWidth: 0.3, 
    borderColor: 'white', 
    borderRadius: 10, 
    backgroundColor: '#253354',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height:240
  },
  image: {
    width: '50%',
    height: '105%',
    borderRadius: 10,
    right: 5,
  },
  textContainer: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  eventName: {
    color: 'white', 
    fontSize: 25, 
    fontWeight: '800', 
    marginBottom: 5,
  },
  creatorName: {
    color: 'white', 
    fontSize: 16, 
    marginBottom: 5, 
  },
  location: {
    color: 'white', 
    fontSize: 16, 
    marginBottom: 5, 
  },
  priceRange: {
    color: 'white', 
    fontSize: 16, 
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconButton: {
    marginRight: -3,
    marginLeft: -15,
    color: 'white'
  },
  infoText: {
    color: "white",
    fontSize: 16,
  },
});

export default EventCard;
