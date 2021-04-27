import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../redux/reducers/user';
import MainTab from './MainTab';
import AuthenticationStack from './AuthenticationStack';

const Stack = createStackNavigator();

const Main = (props) => {

    const token = useSelector(selectToken);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {token ? 
                    <Stack.Screen name='Home' component={MainTab} />
                :
                    <Stack.Screen name='login' component={AuthenticationStack} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;
