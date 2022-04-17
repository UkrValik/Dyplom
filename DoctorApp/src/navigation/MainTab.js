import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import fonts from '../styles/fonts.json';
import Complaints from '../containers/Complaints';
import Requests from '../containers/Requests';
import ChatStack from './Chat';
import HomeStack from './Home';

const Tab = createBottomTabNavigator();

const MainTab = (props) => {

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
        },
        "tabBarActiveTintColor": "#77ABCF",
        "tabBarLabelStyle": {
          "fontFamily": "American Typewriter"
        },
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ],
    });

    return (
        <Tab.Navigator
            screenOptions={screenOptions}
            >
            <Tab.Screen name='Домашня' component={HomeStack} />
            <Tab.Screen name='Скарги' component={Complaints} />
            <Tab.Screen name='Звернення' component={Requests} />
            <Tab.Screen name='Чати' component={ChatStack} />
        </Tab.Navigator>
    );
}

export default MainTab;
