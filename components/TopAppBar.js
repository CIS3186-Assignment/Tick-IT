import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const TopAppBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.container}>
      <Appbar.BackAction iconColor="#FFFFFF" onPress={() => navigation.goBack()} />
      <Text variant='headlineMedium'>{title}</Text>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3700B3",
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title:{
    color: "#FFFFFF",
    fontSize: 300
  }
});

export default TopAppBar;
