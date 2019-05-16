import React, {Component} from "react";
import {Text, View, StyleSheet, Dimensions} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import axios from "axios";

const key = "AIzaSyBqWt3_C3uBiXgTOuB_IcLaNd3DQuxwmxE";
const {width, height} = Dimensions.get("window");

export default class WeatherScreen extends Component {
    state = {
        query: "",
        data: {}
    };

    _onSubmit = () => {
				const {query} = this.state;
				this.setState({query:{}})
				console.log("Padasde!");
        if (!(/[a-z]{3,}/i).test(query)) {
            console.log("Please, enter a valid city name!");
            return;
        }
        const url = `https://maps.googleapis.com/maps/api/geocode/json?components=locality:${query}&key=${key}`;
        axios
            .get(url)
            .then(res => {
                console.log(res.data);
                const {results} = res.data;
                this.setState({
                    data: {
                        name: results[0].address_components[0].long_name,
                        location: {...results[0].geometry.location}
                    }
                });
            })
            .catch(error => console.log(error));
    };

    _onChangeText = value => {
        this.setState({
            query: value
        });
    };

    render() {
        const {query, data} = this.state;
        return (
            <View style={styles.container}>
                <Text> WeatherScreen </Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={query}
                        onChangeText={this._onChangeText}
                        placeholder="search"
                    />
                    <TouchableOpacity
                        onPress={this._onSubmit}
                        style={styles.searchSubmit}
                    >
                        <Icon color="red" name="search" size={30} />
                    </TouchableOpacity>
                </View>
                <Text>{data.name}</Text>
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
    },
    searchContainer: {
        flexDirection: "row"
    },
    searchInput: {
				width: width - width / 6,
				height: 70,
        backgroundColor: "wheat",
    },
    searchSubmit: {
			backgroundColor: 'grey',
				width: width / 6,
				height: 70,
    }
});
