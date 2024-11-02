import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import COLORS from '../../consts/colors';
import Icon from "@expo/vector-icons/AntDesign";

const TextInputWithLabel = ({ label, iconName, value, onChangeText, secureTextEntry }) => {
  return (
    <View  style={styles.container}>
      <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          placeholderTextColor={COLORS.lightBlue}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: COLORS.lightBlue,
    borderRadius: 10,
    paddingVertical: 2,
  },
  textInput: {
    height: 45,
    fontSize: 18,
    color: COLORS.lightBlue,
    flex: 1, 
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    color: COLORS.lightBlue,
  },
  labelContainer:{
    flexDirection: "row",
    marginLeft: 30,
    justifyContent: "flex-start",
  }
});

export default TextInputWithLabel;
