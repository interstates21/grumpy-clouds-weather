import React from "react";
import {Text, View, StyleSheet} from "react-native";
import convertToC from "../helpers/convertToCelsius";
import PropTypes from "prop-types";

export default function ForecastRow({summary, tempLow, tempHigh}) {
    return (
        <View style={styles.row}>
            <Text>{convertToC(tempLow)} - {convertToC(tempHigh)}</Text>
            <Text>{summary}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
		padding: 20,
		marginLeft: 30,
		marginRight: 30,
		marginTop: 5,
		marginBottom: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 25,
        backgroundColor: "#999"
    }
});

ForecastRow.propTypes = {
    tempLow: PropTypes.number.isRequired,
    tempHigh: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired
};
