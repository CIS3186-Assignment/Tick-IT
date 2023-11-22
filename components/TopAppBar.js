import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TopAppBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.container}>
      <Appbar.BackAction iconColor="#FFFFFF" style={styles.back} onPress={() => navigation.goBack()} />
      <Text style={styles.title}>{title}</Text>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#253354",
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 56, 
    position: 'relative', 
  },
  title: {
    color: "#FFFF",
    fontSize: 25,
    marginLeft: 15,
    textAlign: 'center'
  },
  back: {
    position: 'absolute', 
    left: 20, 
  },
});


export default TopAppBar;
