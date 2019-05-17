import React from "react";
import {Text, View, StyleSheet} from "react-native";
import convertToC from "../helpers/convertToCelsius";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import getIconName from "../helpers/getIconName";

export default function CalloutView({title, description, temp}) {
    return (
        <View style={styles.container}>
            <Icon color="#666" name={getIconName(description)} size={40} />
            <View style={styles.firstRow}>
                <Text>{title}</Text>
            </View>
            <View style={styles.secondRow}>
                <Text style={styles.displayTemp}> {convertToC(temp)}</Text>
                <Text style={styles.displayDescr}>{description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 5,
        textAlign: 'center'
    },
    firstRow: {
        flexDirection: "row"
    },
    secondRow: {
		flexDirection: "column",
		justifyContent: 'center',
        alignItems: 'center',
    },
    displayTemp: {
        color: "powderblue",
        fontSize: 24
    },
    displayDescr: {
        color: "powderblue",
        fontSize: 10
    }
});

CalloutView.propTypes = {
    title: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
};
