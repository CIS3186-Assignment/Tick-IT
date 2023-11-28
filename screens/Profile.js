import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';

const Profile = () => {
  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: '#141414'}}>
      <Text style={styles.test}>This is the Profile Screen</Text>
      <View style={{ flex: 1 }}>
        {/* Your main content goes here */}
      </View>
      <BottomNavBar currentScreen="Profile"/>
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

export default Profile;