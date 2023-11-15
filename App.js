import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import Profile from './screens/Profile';
import EventCatalog from './screens/EventCatalog';
import Wallet from './screens/Wallet';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EventCatalog">
          <Stack.Screen
            name="EventCatalog"
            component={EventCatalog}
            options={{ headerShown: false }} // Hide title for EventCatalog screen
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }} // Hide title for Profile screen
          />
          <Stack.Screen
            name="Wallet"
            component={Wallet}
            options={{ headerShown: false }} // Hide title for Wallet screen
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
