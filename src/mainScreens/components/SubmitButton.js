import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import COLORS from '../../consts/colors';
import Icon from "@expo/vector-icons/AntDesign";

const SubmitButton = ({ title, onSubmit, isLoading = false }) => {
  return (
    <TouchableOpacity onPress={onSubmit} style={{ marginBottom: 35 }}>
      <View style={styles.regButton}>
        {
          isLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text
              style={{
                color: "white",
                fontSize: 18,
              }}
            >
              {title}
            </Text>
          )
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  regButton: {
    marginHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: COLORS.pink,
    paddingVertical: 15,
    borderRadius: 40,
  },
});

export default SubmitButton;
