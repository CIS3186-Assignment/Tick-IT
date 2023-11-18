import React from 'react';
import { View, Text } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';

const Wallet = () => {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Text>This is the Wallet Screen</Text>
      <View style={{ flex: 1 }}>
        {/* Your main content goes here */}
      </View>
      <BottomNavBar currentScreen="Wallet" />
    </View>
  );
};

export default Wallet;
