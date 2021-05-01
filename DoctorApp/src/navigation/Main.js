import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Authentication from './Authentication';
import MainTab from './MainTab';
import { selectToken } from '../redux/reducers/user';

const Stack = createStackNavigator();

const Main = (props) => {

    const token = useSelector(selectToken);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {token ? 
                    <Stack.Screen name='tabs' component={MainTab} />
                :
                    <Stack.Screen name='auth' component={Authentication} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;
