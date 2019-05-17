import React, {Component} from "react";
import {StyleSheet, View, Dimensions, Text} from "react-native";
import MapView, {Marker, Callout} from "react-native-maps";
import CalloutView from "../components/CalloutView";
import mapStyle from "../styles/mapStyle";
import pinImage from "../assets/grumpy.png";
import axios from "axios";
import {openWeatherMapKey} from "../api/keys";

const {width} = Dimensions.get("window");

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
        errorMsg: "",
        msg: "",
        marker: null
    };

    _onRegionChange(region) {
        this.setState({region});
    }

    _onMarkerPut = ({coordinate}) => {
        let name = "wonderland";
        let description = "unknown";
        let temp = 0;
        // this.setState({msg:coordinate.latitude})
        const url = `http://api.openweathermap.org/data/2.5/find?lat=${
            coordinate.latitude
        }&lon=${
            coordinate.longitude
        }&cnt=1&apikey=${openWeatherMapKey}&units=imperial`;
        axios
            .get(url)
            .then(res => {
                name = res.data.list[0].name;
                description = res.data.list[0].weather[0].main;
                temp = res.data.list[0].main.temp;
                // this.setState({errorMsg: `${name} ${description} ${temp}`})
                const marker = {
                    name,
                    temp,
                    coordinate,
                    description
                };
                this.setState({marker});
            })
            .catch(err => this.setState({errorMsg: err}));
    };

    _hideCallout() {
        if (this.marker) {
            this.marker.hideCallout();
        }
    }

    render() {
        const {marker, region, errorMsg, msg} = this.state;
        return (
            <View style={{flex: 1}}>
                {errorMsg != 0 && (
                    <View style={styles.errorMsg}>
                        <Text>{errorMsg}</Text>
                    </View>
                )}
                <MapView
                    style={styles.map}
                    initialRegion={region}
                    onRegionChange={region => this._onRegionChange(region)}
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
                            image={pinImage}
                            coordinate={marker.coordinate}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    errorMsg: {
        backgroundColor: "#666",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        padding: 10,
        width: width - 40,
        height: 90
    }
});
