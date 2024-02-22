import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import InputField from '../components/InputField';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Function to handle the signup logic
  const handleSignup = () => {
    // Implement your signup logic here
    console.log('Signing up with', username, password);
  };

  return (
    <View style={styles.container}>

        <Image
            style={styles.logo}
            source={require('../assets/signup-default-image.jpeg')}
        />
        
        <Text style={styles.header}>Create an Account</Text>

        <View style={styles.inputContainer}>
            <InputField style={{width:'100%'}} text="Username" onChangeText={setUsername} value={username} />
            <InputField style={{width:'100%'}} text="Password" onChangeText={setPassword} value={password} secureTextEntry />
            <InputField style={{width:'100%'}} text="Repeat Password" onChangeText={setRepeatPassword} value={repeatPassword} secureTextEntry />
        </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.rememberMeContainer}>
        <Text style={styles.rememberMeText}>Login</Text>
        {/* Implement the Remember Me functionality */}
      </View>

      <View style={styles.divider} />

      <View style={styles.socialLoginContainer}>

        <TouchableOpacity style={styles.socialButton}>
          <Text>Google</Text>
          {/* Add Google logo and logic */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Text>Apple</Text>
          {/* Add Apple logo and logic */}
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius:100
  },
  inputContainer: {
    alignItems: 'center',
    width: '100%', // Take the full width of the screen
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rememberMeText: {
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: 'lightgrey',
    width: '100%',
    marginVertical: 20,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialButton: {
    alignItems: 'center',
    flex:1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 25,
    marginHorizontal: 10
  },
});

export default SignupScreen;
