import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const services = [
  {
    name: "CLOTHING CARE ASSISTANT",
    description: "Get personalized tips from our Chat Bot regarding the care of any of your clothing items.",
    image: require('../assets/clothing_care.jpg'),
    backgroundColor: '#6DA6D6',
    textColor: '#FFFFFF',
  },
  {
    name: "WEATHER BASED RECOMMENDATIONS",
    description: "Dress perfectly for the weather everyday with our tailored outfit suggestions based on your wardrobe.",
    image: require('../assets/weather_recommendations.jpg'),
    backgroundColor: '#D4B478',
    textColor: '#FFFFFF',
  },
  {
    name: "TRENDING LOOKS TODAY",
    description: "Stay stylish with the latest trending outfits curated just for you.",
    image: require('../assets/trending_looks.jpg'),
    backgroundColor: '#808000',
    textColor: '#FFFFFF',
  },
];


function StyleScreen() {
  const navigation = useNavigation();

  const handleServicePress = (serviceName) => {
    if (serviceName === "CLOTHING CARE ASSISTANT") {
      navigation.navigate('ClothingCareAssistant');
    }
    // Add navigation for other services if needed
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>STYLING SERVICES</Text>
      {services.map((service, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.serviceContainer, { backgroundColor: service.backgroundColor }]}
          onPress={() => handleServicePress(service.name)}
        >
          <Image source={service.image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={[styles.serviceName, { color: service.textColor }]}>{service.name}</Text>
            <Text style={[styles.description, { color: service.textColor }]}>{service.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
    color: '#333',
  },
  serviceContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 200,
    overflow: 'hidden',
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '30%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    textAlign: 'right',
  },
});


export default StyleScreen;
