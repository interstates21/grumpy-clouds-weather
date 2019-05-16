import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import MapView, {Marker} from "react-native-maps";
import mapStyle from "../styles/mapStyle";
import pinImage from "../images/grumpy.png";
import axios from "axios";

export default class MapScreen extends Component {
    state = {
        region: {
            latitude: 50.45466,
            longitude: 30.5238,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        },
        marker: null,
        f: null
    };

    _onRegionChange = region => {
        this.setState({region});
    };

    _onMarkerPut = ({coordinate}) => {
        let name = "wonderland";
        let description = "unknown";
        const url = `http://api.openweathermap.org/data/2.5/find?lat=${
            coordinate.latitude
        }&lon=${
            coordinate.longitude
        }&cnt=1&apikey=d112634b1b8228c374336768437938f6`;
        axios
            .get(url)
            .then(res => {
                // console.log(res.data);
                name = res.data.list[0].name;
                description = res.data.list[0].weather[0].description;
                const marker = {
                    name,
                    coordinate,
                    description
                };
                this.setState({marker});
            })
            .catch(error => console.log(error));
    };

    render() {
        const {f, region} = this.state;
        return (
            <MapView
                style={styles.map}
                region={this.state.region}
                onRegionChange={e => this._onRegionChange(e.nativeEvent)}
                onPress={e => {
                    this._onMarkerPut(e.nativeEvent);
                }}
                customMapStyle={mapStyle}
                loadingEnabled={true}
                showsUserLocation={true}
                maxZoomLevel={11}
                minZoomLevel={9}
            >
                {this.state.marker && (
                    <Marker
                        ref={_marker => {
                            this.marker = _marker;
                        }}
                        title={this.state.marker.name}
                        coordinate={this.state.marker.coordinate}
                        description={this.state.marker.description}
                        image={pinImage}
                        onCalloutPress={() => this.props.navigation.navigate('DetailedForecastStack')}
                    />
                )}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
