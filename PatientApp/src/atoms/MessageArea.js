import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../style/colors.json';
import { selectUser } from '../redux/reducers/user';

const MessageArea = (props) => {

    const user = useSelector(selectUser);
    const scrollRef = React.useRef();

    return (
        <View
            style={{
                height: Dimensions.get('screen').height * 3 / 4 - props.keyboardHeight,
                backgroundColor: '#FFF'
            }}>
            <ScrollView
                ref={scrollRef}
                onContentSizeChange={() => scrollRef.current.scrollToEnd({animated: true})}
                >
                {props.messages.map(message => (
                    <View
                        key={message.date}
                        style={{
                            marginHorizontal: '1%',
                            alignItems: message.user._id === user._id ? 'flex-end' : 'flex-start',
                            marginVertical: '1%',
                        }}>
                        <View 
                            style={{
                                borderRadius: 15,
                                backgroundColor: colors.ashgrey,
                                paddingVertical: '1%',
                                paddingHorizontal: '2%',
                                maxWidth: '80%',
                                flexDirection: 'row',
                            }}>
                            {
                                message.user._id === user._id ? 
                                <View
                                    style={{
                                        justifyContent: 'flex-end',
                                        marginRight: 15,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            // color: colors.violet,
                                            fontWeight: '300'
                                        }}>
                                        {new Date(message.date).toLocaleTimeString()}
                                    </Text>
                                </View>
                                :
                                <View></View>
                            }
                            <Text
                                style={{
                                    fontSize: 16,
                                    maxWidth: '80%',
                                }}>
                                {message.message}
                            </Text>
                            {
                                message.user._id !== user._id ?
                                <View
                                    style={{
                                        justifyContent: 'flex-end',
                                        marginLeft: 15,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            // color: colors.violet,
                                            fontWeight: '300'
                                        }}>
                                        {new Date(message.date).toLocaleTimeString()}
                                    </Text>
                                </View>
                                :
                                <View></View>
                            }
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default MessageArea;
