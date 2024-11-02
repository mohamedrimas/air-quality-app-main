import React from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import COLORS from '../../consts/colors';

const Dropdown = ({ label, value, onChangeText, data, onSelect }) => {
    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.textInput}
                    placeholderTextColor={COLORS.lightBlue}
                    placeholder={`Enter ${label}`}
                />
            </View>
            {data.length > 0 && (
                data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onSelect(item.description)}
                        style={styles.suggestionContainer}
                    >
                        <Text style={styles.suggestion}>{item.description}</Text>
                    </TouchableOpacity>
                ))
            )}
            {/* {data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelect(item.description)}
              style={styles.suggestionContainer}
            >
              <Text style={styles.suggestion}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    labelContainer: {
        flexDirection: 'row',
        marginLeft: 30,
        justifyContent: 'flex-start',
    },
    suggestionContainer: {
        marginHorizontal: 30,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightBlue,
    },
    suggestion: {
        fontSize: 16,
        color: COLORS.lightBlue,
    },
});

export default Dropdown;
