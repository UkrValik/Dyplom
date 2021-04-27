import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../containers/Home';

const Tab = createBottomTabNavigator();

const MainTab = (props) => {

    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} />
        </Tab.Navigator>
    );
}

export default MainTab;
