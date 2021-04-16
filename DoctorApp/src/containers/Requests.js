import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const Requests = (props) => {

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
            <Text>
                There are people requests
            </Text>
        </SafeAreaView>
    );
}

export default Requests;
