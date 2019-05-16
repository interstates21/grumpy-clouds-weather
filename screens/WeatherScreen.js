import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {TextInput} from "react-native-gesture-handler";
import axios from "./axios";

export default class WeatherScreen extends Component {
    componentDidMount() {
        axios
            .get(url)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> WeatherScreen </Text>
                <TextInput placeholder="search" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    row: {
        padding: 30,
        backgroundColor: "powderblue"
    }
});
