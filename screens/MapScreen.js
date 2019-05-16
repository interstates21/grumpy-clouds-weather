import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import MapView, {Marker} from "react-native-maps";
import mapStyle from "../styles/mapStyle";
import pinImage from '../images/grumpy.png';

export default class MapScreen extends Component {
    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        },
        marker: null
    };

    // getInitialState() {
    //     return {
    //         region: {
    //             latitude: 37.78825,
    //             longitude: -122.4324,
    //             latitudeDelta: 0.0922,
    //             longitudeDelta: 0.0421
    //         }
    //     };
    // }

    _onRegionChange = region => {
        this.setState({region});
    };

    _onMarkerPut = ({coordinate}) => {
        console.log(coordinate);
        let marker = {
            name: "name",
            coordinate
        };

        this.setState({marker});
    };

    render() {
        return (
            <MapView
                style={styles.map}
                region={this.state.region}
                onRegionChange={e => this._onRegionChange(e.nativeEvent)}
                onLongPress={e => this._onMarkerPut(e.nativeEvent)}
                customMapStyle={mapStyle}
                loadingEnabled={true}
                showsUserLocation={true}
                maxZoomLevel={11}
                minZoomLevel={9}
            >
                {this.state.marker && (
                    <Marker
                        title={this.state.marker.name}
                        coordinate={this.state.marker.coordinate}
                        image={pinImage}
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
