import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../containers/Login';
import Register from '../containers/Register';

const Stack = createStackNavigator();

const Authentication = (props) => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='register' component={Register} />
        </Stack.Navigator>
    );
}

export default Authentication;
