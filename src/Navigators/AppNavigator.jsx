import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../Screens/MainScreens/Splash';
import Main from '../Screens/MainScreens/Main';
import DetailScreen from '../Screens/BasicScreens/DetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
