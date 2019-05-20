import React, {Component} from "react";
import {Text, View, StyleSheet, ScrollView, Dimensions} from "react-native";
import ForecastRow from "../../../components/ForecastRow";

const {width} = Dimensions.get("window");

export default class DetailedForecastScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
		  title: `Forecast for ${navigation.state.params.name}`,
		  headerStyle: {
			  backgroundColor: "#b01030"
		  },
		  headerTitleStyle: {
			  color: "#333"
		  }
		};
	  };

    state = {
        forecast: []
    };

    componentDidMount() {
        const {weekData} = this.props.navigation.state.params;
        this.setState({forecast: [...weekData]})
    }
    render() {
        const {forecast} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.displayInfo}>
					Grumpy Forecast for the Whole Grumpy Week :#
                </Text>
                <ScrollView>
                    {forecast.map((e, index) => (
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
        flex: 1
    },
    displayInfo: {
        width: width,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    }
});
