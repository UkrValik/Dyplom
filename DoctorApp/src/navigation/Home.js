import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../containers/Home';
import UploadDocuments from '../containers/UploadDocuments';
import WebviewDocument from '../containers/WebviewDocument';

const Stack = createStackNavigator();

const HomeStack = (props) => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='uploadDocuments' component={UploadDocuments} />
            <Stack.Screen name='webviewDocument' component={WebviewDocument} />
        </Stack.Navigator>
    );

}

export default HomeStack;
