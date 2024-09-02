import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

function ClothingCareAssistantScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('messagesList');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem('clothingCareMessages', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === '' && !image) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      image: image,
      user: true,
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setInputText('');
    setImage(null);

    try {
      const botResponse = await callOpenAIAPI(inputText, image);
      const botMessage = {
        id: Date.now(),
        text: botResponse,
        user: false,
      };
      const updatedMessagesWithBot = [botMessage, ...updatedMessages];
      setMessages(updatedMessagesWithBot);
      saveMessages(updatedMessagesWithBot);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  };

  const callOpenAIAPI = async (text, imageUri) => {
    const API_KEY = OPENAI_API_KEY;
    const API_URL = 'https://api.openai.com/v1/chat/completions';
  
    let messages = [
      { role: "system", content: "You are a clothing care assistant. If an image is provided, analyze it and provide care instructions for the clothing item shown." },
    ];
  
    if (imageUri) {
      const base64Image = await convertImageToBase64(imageUri);
      messages.push({
        role: "user",
        content: [
          { type: "text", text: text || "Please analyze this clothing item and provide care instructions." },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
        ]
      });
    } else {
      messages.push({ role: "user", content: text });
    }
  
    try {
      const response = await axios.post(API_URL, {
        model: "gpt-4o",
        messages: messages,
        max_tokens: 300
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
  
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return "Sorry, I couldn't process your request. Please try again.";
    }
  };

  const convertImageToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.user ? styles.userMessage : styles.botMessage]}>
      {item.image && <Image source={{ uri: item.image }} style={styles.messageImage} />}
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        style={styles.messageList}
        inverted
      />
      <View style={styles.inputContainer}>
        {image && (
          <Image source={{ uri: image }} style={styles.previewImage} />
        )}
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <Ionicons name="image-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#7F967D',
  },
  messageText: {
    color: '#FFFFFF',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#E5E5EA',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  iconButton: {
    padding: 5,
  },
  previewImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ClothingCareAssistantScreen;
