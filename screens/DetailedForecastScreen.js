import React, {Component} from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

const key = "28a32e4e38e1814625ce1749dd5ea29f";

function ForecastRow({summary}) {
	return (
		<View style={styles.row}>
			<Text>
				{summary}
			</Text>
		</View>
	)
}

export default class DetailedForecastScreen extends Component {
	state = {
		forecast: []
	}

    componentDidMount() {
        const url = `https://api.darksky.net/forecast/${key}/${50.45466},${30.5238}`;

        axios
            .get(url)
            .then(res => {
				const {daily} = res.data
				console.log(res.data);
				this.setState({
					forecast: [...daily.data]
				})
            })
            .catch(error => console.log(error));
    }
    render() {
		const {forecast} = this.state
	
        return (
            <View style={styles.container}>
                <Text> DetailedForecastScreen </Text>
				<ScrollView>
					{
						forecast.map(e=> <ForecastRow key={e.time} summary={e.summary}/>)
					}
				</ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	row: {
		padding: 30,
		backgroundColor: "powderblue"
	}
})