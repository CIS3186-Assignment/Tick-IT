// BottomNavBar.js

import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import customTheme from '../theme';
import { useNavigation } from '@react-navigation/native';

const BottomNavBar = ({ navigationState, onIndexChange, renderScene }) => {
  const navigation = useNavigation();

  const handleNavigate = (routeKey) => {
    const index = navigationState.routes.findIndex((route) => route.key === routeKey);
    onIndexChange(index);

    navigation.navigate('Root', { screen: routeKey }); // Navigate to 'Root' and specify the screen
  };

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: customTheme.colors.tertiary }}
      navigationState={navigationState}
      onIndexChange={onIndexChange}
      renderScene={renderScene}
      renderIcon={({ route, focused, color }) => (
        <Icon
          name={route.icon}
          size={25}
          color={focused ? customTheme.colors.primary : customTheme.colors.onPrimary}
        />
      )}
      renderLabel={({ route, color }) => (
        <Text style={{ color: 'white', textAlign: 'center' }} onPress={() => handleNavigate(route.key)}>
          {route.title}
        </Text>
      )}
    />
  );
};

export default BottomNavBar;
