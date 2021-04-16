import React, { useState } from 'react';
import { View, TouchableNativeFeedback, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import fonts from '../styles/fonts.json';

const MarksButtons = (props) => {

    const [thumbUp, setThumbUp] = useState(false);
    const [thumbDown, setThumbDown] = useState(false);

    const pressDown = () => {

        setThumbDown(true);
        setThumbUp(false);
    }

    const pressUp = () => {

        setThumbDown(false);
        setThumbUp(true);
    }

    const pressCancel = () => {

        setThumbDown(false);
        setThumbUp(false);
    }

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                }}>
                <TouchableNativeFeedback onPress={() => pressDown()}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingVertical: 10
                        }}>
                        <Ionicons
                            name={thumbDown ? 'thumbs-down' : 'thumbs-down-outline'}
                            size={32}
                            color='#FF333A'
                            />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => pressUp()}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingVertical: 10
                        }}>
                        <Ionicons
                            name={thumbUp ? 'thumbs-up' : 'thumbs-up-outline'}
                            size={32}
                            color='#41A300'
                            />
                    </View>
                </TouchableNativeFeedback>
            </View>

            <TouchableNativeFeedback onPress={() => pressCancel()}>
                <View>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: fonts.ios,
                        backgroundColor: '#FEFDEB',
                        width: '100%',
                        textAlign: 'center',
                        paddingVertical: 10,
                        }}>
                        Відмінити оцінку
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

export default MarksButtons;
