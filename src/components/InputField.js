import React from 'react';
import { TextInput, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Input: {
    width: screenWidth - 60,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    color: '#8b8b8b',
    fontSize: 15,
    elevation: 3,
    shadowColor: '#030303',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 15
  },
});

const defaultProps = {
  text: 'input',
};

const InputField = (props) => {
  return (
    <TextInput
      style={styles.Input}
      placeholder={props.text || defaultProps.text}
      placeholderTextColor="#8b8b8b" // React Native uses `placeholderTextColor` for placeholder color
      // Add more props that you need for the TextInput
    />
  );
};

export default InputField;
