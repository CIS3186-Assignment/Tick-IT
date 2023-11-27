import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import EventDetails from './screens/EventDetails';
import EventCatalog from './screens/EventCatalog';
import Profile from './screens/Profile';
import Wallet from './screens/Wallet';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="EventCatalog"
            component={EventCatalog}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Wallet"
            component={Wallet}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
