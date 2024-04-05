import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import InputField from '../../components/InputField'; // Assuming this is a pre-styled TextInput

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login logic
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with', email, password);
  };

  return (
    <View style={styles.container}>

      <Image
        style={styles.logo}
        source={require('../assets/login-default-image.jpeg')}
      />
      
      <Text style={styles.header}>Savar</Text>
      <Text style={styles.subheader}>Track your meals and improve your well-being!</Text>

      <View style={styles.inputContainer}>
        <InputField style={{width:'100%'}} text="Email" onChangeText={setEmail} value={email} />
        <InputField style={{width:'100%'}} text="Password" onChangeText={setPassword} value={password} secureTextEntry />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot your password?</Text>

      <View style={styles.divider} />

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Text>Google</Text>
          {/* Add Facebook logo and logic */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Text>Apple</Text>
          {/* Add Google logo and logic */}
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
    backgroundColor: '#fff', // Assuming a white background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20, // For better text wrapping
  },
  logo: {
    width: 150, // Adjust the size to fit your layout
    height: 150, // Adjust the size to fit your layout
    marginBottom: 20,
    borderRadius: 75, // Half the width and height for a perfect circle
  },
  inputContainer: {
    width: '100%', // Take the full width of the screen
    marginBottom: 10,
    alignItems: 'center'
  },
  forgotPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 10,
    color:'blue'
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 50,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 25,
    marginHorizontal: 10,
  }
});

export default LoginScreen;
