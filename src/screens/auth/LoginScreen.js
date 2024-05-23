import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, Alert} from 'react-native';
import InputField from '../../components/InputField'; 
import { login } from '../../api/FirestoreAuthService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('Success', 'Successfully Logged In!');
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Image
        style={styles.logo}
        source={require('../../assets/login-default-image.jpeg')}
      />
      
      <Text style={styles.header}>Savar</Text>
      <Text style={styles.subheader}>Track your meals and improve your well-being!</Text>

      <View style={styles.inputContainer}>
        <InputField style={{ width: '100%' }} text="Email" onChangeText={setEmail} value={email} />
        <InputField style={{ width: '100%' }} text="Password" onChangeText={setPassword} value={password} secureTextEntry />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
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
    backgroundColor: '#fff', 
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
    paddingHorizontal: 20, 
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20,
    borderRadius: 75, 
  },
  inputContainer: {
    width: '100%', 
    marginBottom: 10,
    alignItems: 'center'
  },
  forgotPassword: {
    color:'blue',
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
  signUpButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 16,
  },
  signUpLink: {
    color: '#6200ee',
    textDecorationLine: 'underline',
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
});

export default LoginScreen;
