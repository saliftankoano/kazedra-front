import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StyleScreen from '../screens/StyleScreen';
import ClothingCareAssistantScreen from '../screens/ClothingCareAssistantScreen';

const Stack = createStackNavigator();

function StyleStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Style" component={StyleScreen} />
      <Stack.Screen name="ClothingCareAssistant" component={ClothingCareAssistantScreen} />
    </Stack.Navigator>
  );
}

export default StyleStackNavigator;