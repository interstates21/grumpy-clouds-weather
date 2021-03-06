import React, {Component} from "react";
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity
} from "react-native";
import ForecastRow from "../components/ForecastRow";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import {googleKey, darkSkyKey} from "../api/keys";

const {width} = Dimensions.get("window");

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
                            "Sorry, we don't know anything about this place:("
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
                {errorMsg != 0 && (
                    <View style={styles.errorMsg}>
                        <Text>{errorMsg}</Text>
                    </View>
                )}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        value={query}
                        onChangeText={this._onChangeText}
                        placeholder="search weather by city"
                    />
                    <TouchableOpacity
                        onPress={this._onSubmit}
                        style={styles.searchSubmit}
                    >
                        <Icon color="red" name="search" size={30} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.displayName}>{data.name}</Text>
                <ScrollView>
                    {forecast.map(e => (
                        <ForecastRow
                            key={e.time}
                            time={e.time}
                            tempLow={parseInt(e.temperatureLow)}
                            tempHigh={parseInt(e.temperatureHigh)}
                            summary={e.summary}
                            icon={e.icon}
                        />
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
    searchContainer: {
        flexDirection: "row",
        height: 70,
        width: width,
        alignItems: "center",
        justifyContent: "center"
    },
    searchInput: {
        width: width - width / 4,
        backgroundColor: "crimson",
        padding: 10,
        margin: 5,
        borderRadius: 15
    },
    searchSubmit: {
        color: "crimson",
        width: width / 5,
        margin: 5,
        padding: 5
    },
    errorMsg: {
        backgroundColor: "#666",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        padding: 10,
        width: width - 40,
        height: 90
    },
    displayName: {
        paddingBottom: 5,
    }
});
