import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import fonts from '../styles/fonts.json';
import Home from '../containers/Home';
import Complaints from '../containers/Complaints';
import Requests from '../containers/Requests';
import Chats from '../containers/Chats';

const Tab = createBottomTabNavigator();

const Main = (props) => {

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
                case 'Домашня':
                    iconName = focused ? 'home' : 'home-outline';
                    break;
                case 'Скарги':
                    iconName = focused ? 'list' : 'list-outline';
                    break;
                case 'Чати':
                    iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                    break;
                case 'Звернення':
                    iconName = focused ? 'person-add' : 'person-add-outline';
                    break;
            }
            return <Ionicons name={iconName} size={size} color='#77ABCF' />
        }
    });

    const tabBarOptions = {
        activeTintColor: '#77ABCF',
        labelStyle: {
            fontFamily: fonts.ios,
        },
    };

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={screenOptions}
                tabBarOptions={tabBarOptions}

                >
                <Tab.Screen name='Домашня' component={Home} />
                <Tab.Screen name='Скарги' component={Complaints} />
                <Tab.Screen name='Звернення' component={Requests} />
                <Tab.Screen name='Чати' component={Chats} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Main;
