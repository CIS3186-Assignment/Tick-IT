import React from 'react';
import { View, Text } from 'react-native';
import BottomNavBar from '../components/BottomNavBar.js';

const EventCatalog = () => {
  return (
    <View>
      <Text>This is the EventCatalog Screen</Text>
      <BottomNavBar currentScreen="EventCatalog"/>
    </View>
  );
};

export default EventCatalog;
