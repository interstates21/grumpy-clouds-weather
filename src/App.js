import React, {Component} from "react";
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator
} from "react-navigation";
import MapScreen from "./screens/MapScreen";
import WeatherScreen from "./screens/WeatherScreen";
import DetailedForecastScreen from "./screens/DetailedForecastScreen";
import Icon from "react-native-vector-icons/FontAwesome";

const MapNavigator = createStackNavigator({
    MapStack: MapScreen,
    DetailedForecastStack: DetailedForecastScreen
});

const MainNavigator = createBottomTabNavigator(
    {
        MapTab: {
            screen: MapNavigator,
            navigationOptions: {
                tabBarLabel: "Map",
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name="map-marker" size={30} />
                )
            }
        },
        WeatherTab: {
            screen: WeatherScreen,
            navigationOptions: {
                tabBarLabel: "Weather",
                tabBarIcon: ({tintColor}) => (
                    <Icon color={tintColor} name="sun-o" size={30} />
                )
            }
        }
    },
    {
        initialRouteName: "MapTab",
        tabBarOptions: {
            inactiveTintColor: "#666",
            activeTintColor: "crimson",
            labelStyle: {
                fontSize: 10,
                paddingBottom: 2
            },
            tabStyle: {},
            style: {
                height: 50,
                backgroundColor: "whitesmoke"
            }
        }
    }
);

export default createAppContainer(MainNavigator);
