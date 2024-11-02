import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

import COLORS from '../../consts/colors';
const { width } = Dimensions.get("screen");
const cardWidth = width/4;

const PrimaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.btnContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const SecondaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={{...style.btnContainer, backgroundColor: COLORS.white}}>
        <Text style={{...style.title, color: COLORS.primary}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FeedbackButton = ({ title, onPress = () => { } }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{alignItems:"center"}}>
      <View style={{ ...style.fdBtnContainer, backgroundColor: COLORS.white }}>
        <Text style={{ ...style.title, color: COLORS.primary }}><Icon name="feedback" color={"red"} size={28} /></Text>    
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  title: {color: COLORS.white, fontWeight: 'bold', fontSize: 18},
  btnContainer: {
    backgroundColor: COLORS.pink,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fdBtnContainer: {
    backgroundColor: COLORS.primary,
    height: 30,
    width: cardWidth,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:15
  },

});

export { PrimaryButton, SecondaryButton, FeedbackButton};
