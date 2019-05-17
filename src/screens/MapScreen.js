import React, {Component} from "react";
import {StyleSheet} from "react-native";
import MapView, {Marker, Callout} from "react-native-maps";
import CalloutView from '../components/CalloutView'
import mapStyle from "../styles/mapStyle";
import pinImage from "../assets/grumpy.png";
import axios from "axios";
import {openWeatherMapKey} from "../api/keys";

export default class MapScreen extends Component {
    static navigationOptions = {
        title: "GrumpyClouds",
        headerStyle: {
            backgroundColor: "#b01030"
        },
        headerTitleStyle: {
            color: "#333"
        }
    };

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
        let temp = 0
        const url = `http://api.openweathermap.org/data/2.5/find?lat=${
            coordinate.latitude
        }&lon=${coordinate.longitude}&cnt=1&apikey=${openWeatherMapKey}&units=imperial`;
        axios
            .get(url)
            .then(res => {
                name = res.data.list[0].name;
                description = res.data.list[0].weather[0].main;
                temp = res.data.list[0].main.temp
                const marker = {
                    name,
                    temp,
                    coordinate,
                    description
                };
                this.setState({marker});
            })
            .catch(error => console.log(error));
    };

    _hideCallout() {
        if (this.marker) {
            this.marker.hideCallout();
        }
    }

    render() {
        const {marker, region} = this.state;
        return (
            <MapView
                style={styles.map}
                region={region}
                onRegionChange={e => this._onRegionChange(e.nativeEvent)}
                onLongPress={e => {
                    this._hideCallout();
                    this._onMarkerPut(e.nativeEvent);
                }}
                customMapStyle={mapStyle}
                loadingEnabled={true}
                showsUserLocation={true}
                maxZoomLevel={8}
                minZoomLevel={7}
            >
                {marker ? (
                    <Marker
                        ref={ref => {
                            this.marker = ref;
                        }}
                        coordinate={marker.coordinate}
                        image={pinImage}
                        onCalloutPress={() =>
                            this.props.navigation.navigate(
                                "DetailedForecastStack",
                                {...marker}
                            )
                        }
                    >
                        <Callout>
                            <CalloutView
                                temp={parseInt(marker.temp)}
                                title={marker.name}
                                description={marker.description}
                            />
                        </Callout>
                    </Marker>
                ) : null}
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
