import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  Alert,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import COLORS from '../../consts/colors';
const { width, height } = Dimensions.get('screen');
const cardWidth = width / 1.2;
const cardHeight = height / 6;

const MenuCard = ({ title, direct, navigation, icon }) => {
  return (
    <TouchableHighlight
      underlayColor={COLORS.backgroundColor}
      activeOpacity={0.9}
      onPress={() => navigation.navigate(direct)}>
      <View style={style.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icon} style={{ height: 100, width: 100 }} />
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={2}
            style={{
              flex: 1,
              fontSize: 25,
              fontWeight: 'bold',
              textAlign: 'center',
              color: COLORS.darkGreen
            }}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
  card: {
    height: cardHeight,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.backgroundColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding:20,
    elevation: 5,
  },
});

export default MenuCard;
