// screens/RegistrationScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const createUserDoc = async(uid)=>{
    fetch("http://localhost:8080/user/addUser",
      {
        method:"POST",
        body:JSON.stringify({
          "user_id":uid,
          "customer_id":"none"
        }),
        headers:{
          "Content-Type":"application/json",
        }
      }
    ).then((res)=>{
      console.log(res.status)
    })
  }

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        // TODO: there may be a cleaner way to write this
        return createUserDoc(user.uid).then(()=>{
          return updateProfile(user, {
            displayName: `${firstName} ${lastName}`
          });
        })
      })
      .then(() => {
        console.log('Registration successful');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error('Error registering:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  loginLink: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
});

export default RegistrationScreen;
