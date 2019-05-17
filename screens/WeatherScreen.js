import React, {Component} from "react";
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {TextInput} from "react-native-gesture-handler";
import axios from "axios";

const googleKey = "AIzaSyBqWt3_C3uBiXgTOuB_IcLaNd3DQuxwmxE";
const darkSkyKey = "28a32e4e38e1814625ce1749dd5ea29f";
const {width, height} = Dimensions.get("window");

function ForecastRow({summary}) {
    return (
        <View style={styles.row}>
            <Text>{summary}</Text>
        </View>
    );
}
export default class WeatherScreen extends Component {
    state = {
        query: "",
        data: {},
        errorMsg: "",
        forecast: []
    };

    _onSubmit = () => {
        const {query} = this.state;

        this.setState({query: {}, errorMsg: ""});
        if (!/[a-z]{3,}/i.test(query)) {
            this.setState({errorMsg: "Please, enter a valid city name!"});
            return;
        }
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
            query
        )}&components=locality:${encodeURI(query)}&key=${googleKey}`;
        axios
            .get(geocodingUrl)
            .then(res => {
                const {results} = res.data;
                const cityResults = results[0].address_components.filter(e =>
                    e.types.includes("locality")
                );
                const countryResults = results[0].address_components.filter(e =>
                    e.types.includes("country")
                );
                if (!cityResults) {
                    this.setState({
                        errorMsg:
                            "Sorry, we don't know anything about your city:("
                    });
                    return;
                }
                const location = {...results[0].geometry.location};
                this.setState({
                    data: {
                        name: `${cityResults[0].long_name}, ${
                            countryResults[0].short_name
                        }`,
                        location
                    }
                });
                const darkSkyUrl = `https://api.darksky.net/forecast/${darkSkyKey}/${
                    location.lat
                },${location.lng}`;
                return axios.get(darkSkyUrl);
            })
            .then(res => {
                const {daily} = res.data;
                console.log(res.data);
                this.setState({
                    forecast: [...daily.data]
                });
            })
            .catch(() => this.setState({errorMsg: "Request Failed:("}));
    };

    _onChangeText = value => {
        this.setState({
            query: value
        });
    };

    render() {
        const {query, data, errorMsg, forecast} = this.state;
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
                {errorMsg != 0 && (
                    <View style={styles.errorMsg}>
                        <Text>{errorMsg}</Text>
                    </View>
                )}
                {data.location && (
                    <Text>
                        {data.location.lat} = {data.location.lng}
                    </Text>
                )}
                <ScrollView>
                    {forecast.map(e => (
                        <ForecastRow key={e.time} summary={e.summary} />
                    ))}
                </ScrollView>
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
        backgroundColor: "wheat"
    },
    searchSubmit: {
        backgroundColor: "grey",
        width: width / 6,
        height: 70
    },
    errorMsg: {
        backgroundColor: "yellow",
        width: width,
        height: 90
    }
});
