import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../style/colors.json';
import { baseUrl } from '../config.json';

const ChatItem = (props) => {

    const doctor = props.chat.users.find(user => user.roles.includes('doctor'));
    const uri = baseUrl + '/user/doctor-avatar/' + doctor.avatar.split('avatars/')[1];
    const lastmessage = props.chat.messages[props.chat.messages.length - 1];

    const shortMessage = (text) => {
        return text.length > 30 ? text.substr(0, 30) + '...' : text;
    }

    const beautifyDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
    }

    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate('chatroom', {chat_id: props.chat._id})}
            activeOpacity={0.75}
            >
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#FFF',
                    borderColor: colors.ashgrey,
                    borderBottomWidth: 0.3,
                    width: '100%',
                    paddingVertical: '2%',
                    alignSelf: 'center',
                }}
                >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                    >
                    <Image
                        source={{
                            uri: uri,
                        }}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60,
                        }}
                        resizeMode='contain'
                        />
                </View>
                <View
                    style={{
                        flex: 3,
                        // marginLeft: '2%',
                    }}
                    >
                    <View
                        style={{
                            marginBottom: '2%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                            }}
                            >
                            {doctor.firstname} {doctor.lastname}
                        </Text>
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: '100',
                                marginRight: '2%',
                            }}>
                            {lastmessage ? beautifyDate(lastmessage.date) : ''}
                    </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                color: colors.ashgrey,
                            }}>
                            {lastmessage ? shortMessage(lastmessage.message) : 'Нема смс'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ChatItem;
