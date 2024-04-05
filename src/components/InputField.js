import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
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

const InputField = ({ style, text, ...rest }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={text}
      placeholderTextColor="#8b8b8b"
      {...rest}
    />
  );
};

export default InputField;
