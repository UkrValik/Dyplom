import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chats from '../containers/Chats';
import ChatRoom from '../containers/ChatRoom';

const Stack = createStackNavigator();

const ChatStack = (props) => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='chats' component={Chats} />
            <Stack.Screen name='chatroom' component={ChatRoom} />
        </Stack.Navigator>
    );
}

export default ChatStack;
