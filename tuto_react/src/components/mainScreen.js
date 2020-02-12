import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homeTab from "./tabs/homeTab";
import playlistTab from "./tabs/playlistTab";
import searchTab from "./tabs/searchTab";
import { Ionicons } from '@expo/vector-icons';

function HomeView(){
    return(
      homeTab.homeView()
    );
}

function PlaylistView(){
    return(
        playlistTab.playlistView()
    )
}

function SearchView(){
    return(
        searchTab.searchView()
    )
}

const Tab = createBottomTabNavigator();

export default class MainScreen extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <NavigationContainer independent={true}>
                <Tab.Navigator screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if(route.name === 'Home') {
                            iconName = 'md-home';
                        }else if(route.name === 'Playlist'){
                            iconName = 'ios-list';
                        }else if(route.name === 'Search'){
                            iconName = 'md-search';
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}
                               tabBarOptions={{
                                   activeTintColor: '#20D760',
                                   inactiveTintColor: 'gray',
                               }}
                >
                    <Tab.Screen name="Home" component={HomeView} />
                    <Tab.Screen name="Playlist" component={PlaylistView} />
                    <Tab.Screen name="Search" component={SearchView} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }

    static mainScreen(){
        return (
            <MainScreen/>
        );
    }
}
