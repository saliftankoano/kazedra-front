import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function WardrobeScreen() {
  return (
    <View style={styles.container}>
      <Text>Wardrobe Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WardrobeScreen;
