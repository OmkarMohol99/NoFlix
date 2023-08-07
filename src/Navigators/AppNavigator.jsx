import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../Screens/MainScreens/Splash';
import Main from '../Screens/MainScreens/Main';
import DetailScreen from '../Screens/BasicScreens/DetailScreen';
import Search from '../Screens/BasicScreens/Search';
import CastDetails from '../Screens/BasicScreens/CastDetails';
import CastMediaDetails from '../Screens/BasicScreens/CastMediaDetails';

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

        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CastDetails"
          component={CastDetails}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CastMediaDetails"
          component={CastMediaDetails}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
