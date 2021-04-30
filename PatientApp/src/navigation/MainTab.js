import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../containers/Home';
import Complaint from '../containers/Complaint';

const Tab = createBottomTabNavigator();

const MainTab = (props) => {

    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Скарги' component={Complaint} />
        </Tab.Navigator>
    );
}

export default MainTab;
