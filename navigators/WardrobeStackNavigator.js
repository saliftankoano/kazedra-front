import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WardrobeScreen from '../screens/WardrobeScreen';

const Stack = createStackNavigator();

function WardrobeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Wardrobe" component={WardrobeScreen} />
      {/* Add more screens here if needed */}
    </Stack.Navigator>
  );
}

export default WardrobeStackNavigator;
