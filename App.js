import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Location from "expo-location";
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onIdTokenChanged } from 'firebase/auth';

// Navigators
import MainTabNavigator from './navigators/MainTabNavigator';
import AuthStackNavigator from './navigators/AuthStackNavigator';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {currentUser ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
