import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import InputField from '../../components/InputField';
import { signup } from '../../api/FirestoreAuthService';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSignup = async () => {
    if (password !== repeatPassword) {
      Alert.alert('Passwords Do Not Match', 'Ensure you are inputting the right password!');
      return;
    }

    try {
      await signup(username, password);
      Alert.alert('Success', 'Created Account and Logged In');
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'The email address is already in use by another account.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email');
      } else {
        // Handle other errors here
      }
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/signup-default-image.jpeg')}
      />
      <Text style={styles.header}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <InputField style={{ width: '100%' }} text="Email" onChangeText={setUsername} value={username} />
        <InputField style={{ width: '100%' }} text="Password" onChangeText={setPassword} value={password} secureTextEntry />
        <InputField style={{ width: '100%' }} text="Repeat Password" onChangeText={setRepeatPassword} value={repeatPassword} secureTextEntry />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.haveAccountText}>Have an account? <Text style={styles.loginLink}>Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
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
    borderRadius: 100
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
  haveAccountText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  loginLink: {
    color: '#6200ee',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
