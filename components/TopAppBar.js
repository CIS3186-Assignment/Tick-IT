import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import customTheme from '../theme';

const TopAppBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.container}>
      <Appbar.BackAction iconColor="#FFFFFF" style={styles.back} onPress={() => navigation.goBack()} accessibilityLabel="Go back" />
      <Text style={styles.title} allowFontScaling={true}>{title}</Text>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customTheme.colors.tertiary,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 56, 
    position: 'relative', 
  },
  title: {
    color: customTheme.colors.onPrimary,
    fontSize: 25,
    marginLeft: 15,
    textAlign: 'center'
  },
  back: {
    position: 'absolute', 
    left: 10, 
  },
});


export default TopAppBar;
