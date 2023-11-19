import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Icon, MD3Colors } from 'react-native-paper';

const EventCard = ({ event }) => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('EventDetails', { event });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <Card style={styles.cardContent}>
        <Card.Content style={styles.content}>
          <Image style={styles.image} source={{ uri: event?.image }} />
          <View style={styles.textContainer}>
            <Text variant="titleLarge">{event?.name}</Text>
            <Text variant="bodyMedium">{event?.creator?.name}</Text>
            <Text variant="bodyMedium">{event?.location}</Text>
            <Text variant="bodyMedium">€25 - 30</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    marginVertical: 15, 
    backgroundColor: '#253354'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height:165
  },
  image: {
    width: '40%',
    height: '110%',
    borderRadius: 1,
    right: 5,
  },
  textContainer: {
    marginLeft: 10,
    flexDirection: 'column',
  }
});

export default EventCard;
