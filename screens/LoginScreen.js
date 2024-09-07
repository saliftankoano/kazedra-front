import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Icon from "react-native-vector-icons/Ionicons";
import { globalStyles, colors } from "../styles/globalStyles";
import { Link } from '@react-navigation/native';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  const handleOpenEye = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <SafeAreaView style={styles.bigCont}>
      <ScrollView>
        <View style={styles.cont}>
          <View style={styles.logoCont}>
            <Image 
              source={require("../assets/weathero.png")} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </View>
          <Text style={[globalStyles.text, { marginVertical: 10 }]}>Register with email</Text>
          <TextInput
            value={email}
            autoCapitalize="none"
            placeholder="Enter email"
            autoComplete="off"
            onChangeText={(email) => setEmail(email)}
            style={styles.textInput}
          />
          
          {/* Box around password field and visibility icon */}
          <View style={styles.inputBox}>
            <TextInput
              value={password}
              placeholder="Enter password"
              onChangeText={(text) => setPassword(text)}
              style={styles.passwordInput}
              autoCapitalize="none"
              autoComplete="off"
              secureTextEntry={hidePassword}
            />
            {hidePassword ? (
              <Icon
                name="eye-off"
                solid
                style={styles.pswIcon}
                onPress={handleOpenEye}
              />
            ) : (
              <Icon
                name="eye"
                solid
                style={styles.pswIcon}
                onPress={handleOpenEye}
              />
            )}
          </View>

          {/* Box around login button */}
          <View style={styles.loginButton}>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.textBtn}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linksCont}>
            <Text>Don't have an account yet?</Text>
            <Link to={{ screen: "Registration" }} style={styles.signup}>Sign up</Link>
          </View>
          <Link to={{ screen: "ForgotPassword"}} style={styles.forgotPassword}>Forgot Password?</Link>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bigCont: {
    backgroundColor: "white",
    flex: 1,
   
  },
  signup: {
    color: "blue",
    marginLeft: 10
  },
  forgotPassword: {
    marginTop: 5,
    color: 'blue',
   
  },
  cont: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignSelf: "center"
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: "10%",
    marginTop: 50
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    padding: 5,
    marginTop: 12,
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 14
  },
  pswIcon: {
    marginRight: 10,
    color: "gray",
    fontSize: 21,
  },
  buttonBox: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
    backgroundColor: "white",
    padding: 5,
    alignItems: "center"
  },
  loginButton: {
    alignSelf: "center",
    width: "90%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    marginTop: 30, // Controls space above the button box

  },
  linksCont: {
    flexDirection: "row",
    marginTop: "10%"
  },
  
  textBtn: {
    fontSize: 18,
    color: colors.white,
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbb",
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 14,
    borderRadius: 5,
    marginTop: 12,
  },
});

export default LoginScreen;
