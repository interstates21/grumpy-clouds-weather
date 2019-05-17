import React from "react";
import {Text, View, StyleSheet} from "react-native";
import convertToC from "../helpers/convertToCelsius";
import Icon from "react-native-vector-icons/FontAwesome";
import getIconName from "../helpers/getIconName";
import PropTypes from "prop-types";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export default function ForecastRow({time, summary, tempLow, tempHigh, icon}) {
    const rawDate = new Date(time * 1000);
    const day = rawDate.getDate();
    const month = months[rawDate.getMonth()];
    return (
        <View style={styles.row}>
            <Text style={styles.displayDate}>{day}, {month}</Text>
            <Icon color="white" name={getIconName(icon)} size={40} />
            <View style={styles.firstRow}>
                <Text style={styles.displayMin}>{convertToC(tempLow)}</Text>
                <Text style={styles.displayMax}>{convertToC(tempHigh)}</Text>
            </View>
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
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: "#e8e8e8",
        textAlign: "center"
    },
    firstRow: {
        flexDirection: "row",
        marginBottom: 3
    },
    displayMin: {
        fontSize: 25,
        marginRight: 5,
        fontWeight: "bold",
        color: "powderblue"
    },
    displayMax: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 5,
        color: "pink"
    },
    displayDate: {
        color: "#999",
        fontSize: 20,
        margin: 10,
        textAlign: 'left'
    }
});

ForecastRow.propTypes = {
    time: PropTypes.number.isRequired,
    tempLow: PropTypes.number.isRequired,
    tempHigh: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};
