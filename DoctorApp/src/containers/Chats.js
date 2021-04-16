import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const Chats = (props) => {

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
            <Text>
                There are active chats
            </Text>
        </SafeAreaView>
    );
}

export default Chats;
