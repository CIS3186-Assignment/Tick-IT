import React from 'react';
import { View, Text } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';

BottomNavBar
const Profile = () => {


  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Text>This is the Profile Screen</Text>
      <View style={{ flex: 1 }}>
        {/* Your main content goes here */}
      </View>
      <BottomNavBar currentScreen="Profile"/>
    </View>
  );
};

export default Profile;
