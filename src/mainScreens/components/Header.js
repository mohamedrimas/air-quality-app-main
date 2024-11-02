import {
    View,
    Text,
    StyleSheet
} from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";


const Header = ({ title, navigation, fontSize=28 }) => {
    return (
        <View style={style.header}>
            <View style={{ flexDirection: "row" }}>
                <Icon
                    name="arrow-back-ios"
                    style={{ marginTop: 5, color: COLORS.darkGreen }}
                    size={fontSize}
                    onPress={navigation.goBack}
                />
                <Text
                    style={{ fontSize: fontSize, fontWeight: "bold", marginLeft: 10, color: COLORS.darkGreen }}
                >
                    {title}
                </Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        marginTop: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
});

export default Header;
