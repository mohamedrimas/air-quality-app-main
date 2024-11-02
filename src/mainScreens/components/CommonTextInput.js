import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import COLORS from '../../consts/colors';
import Icon from "@expo/vector-icons/AntDesign";

const CommonTextInput = ({ placeholder, iconName, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={iconName} color={COLORS.lightBlue} size={24} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        placeholderTextColor={COLORS.lightBlue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: COLORS.lightBlue,
    borderRadius: 40,
    paddingVertical: 2,
  },
  textInput: {
    paddingHorizontal: 10,
    height: 45,
    fontSize: 18,
    color: COLORS.lightBlue,
    flex: 1, // Ensures the input field takes up the remaining space
  },
});

export default CommonTextInput;
