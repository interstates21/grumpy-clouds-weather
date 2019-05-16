import React, {Component} from "react";
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator
} from "react-navigation";
import MapScreen from "./screens/MapScreen";
import WeatherScreen from "./screens/WeatherScreen";
import Icon from "react-native-vector-icons/FontAwesome";

const MainNavigator = createBottomTabNavigator(
    {
        Map: {
            screen: MapScreen,
            navigationOptions: {
                tabBarLabel: "Map",
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name="globe" size={30} />
                )
            }
        },
        Weather: {
            screen: WeatherScreen,
            navigationOptions: {
                tabBarLabel: "Weather",
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name="map-signs" size={30} />
                )
            }
        }
    },
    {
        initialRouteName: "Map"
    }
);

export default createAppContainer(MainNavigator);
