import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import MovieDetailsScreen from '../screen/MovieDetailsScreen';

const AppNavigator = () => {
  const AppStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'HomeScreen'}>
        <AppStack.Screen name="HomeScreen" component={HomeScreen} />
        <AppStack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;