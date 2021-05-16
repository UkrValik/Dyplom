import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../containers/Home';
import Complaint from '../containers/Complaint';
import Doctors from '../containers/Doctors';
import Consultations from '../containers/Consultations';
import ChatStack from './ChatStack';
import colors from '../style/colors.json';

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
                case 'Консультації':
                    iconName = focused ? 'person-add' : 'person-add-outline';
                    break;
                case 'Лікарі':
                    iconName = focused ? 'person-circle': 'person-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color='#77ABCF' />
        }
    });

    const tabBarOptions = {
        activeTintColor: colors.iceberg,
    }

    return (
        <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
            <Tab.Screen name='Домашня' component={Home} />
            <Tab.Screen name='Скарги' component={Complaint} />
            <Tab.Screen name='Лікарі' component={Doctors} />
            <Tab.Screen name='Консультації' component={Consultations} />
            <Tab.Screen name='Чати' component={ChatStack} />
        </Tab.Navigator>
    );
}

export default MainTab;
