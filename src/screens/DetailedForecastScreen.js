import React, {Component} from "react";
import {Text, View, StyleSheet, ScrollView, Dimensions} from "react-native";
import ForecastRow from "../components/ForecastRow";
import axios from "axios";
import {darkSkyKey} from "../api/keys";
import Icon from "react-native-vector-icons/FontAwesome";

const {width} = Dimensions.get("window");

export default class DetailedForecastScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
		  title: `Forecast for ${navigation.state.params.name}`,
		  headerStyle: {
			  backgroundColor: "#b01030"
		  },
		  headerTitleStyle: {
			  color: "#222"
		  }
		};
	  };

    state = {
        forecast: []
    };

    componentDidMount() {
        const {coordinate} = this.props.navigation.state.params;
        const url = `https://api.darksky.net/forecast/${darkSkyKey}/${
            coordinate.latitude
        },${coordinate.longitude}`;

        axios
            .get(url)
            .then(res => {
                const {daily} = res.data;
                console.log(res.data);
                this.setState({
                    forecast: [...daily.data]
                });
            })
            .catch(error => console.log(error));
    }
    render() {
        const {forecast} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.displayInfo}>
					Grumpy Forecast for the Whole Damn Week
                </Text>
                <ScrollView>
                    {forecast.map(e => (
                        <ForecastRow
                            key={e.time}
                            tempLow={parseInt(e.temperatureLow)}
                            tempHigh={parseInt(e.temperatureHigh)}
                            summary={e.summary}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    displayInfo: {
        width: width,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    }
});
