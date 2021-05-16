import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../styles/colors.json';
import { selectUser } from '../redux/reducers/user';

const ChatItem = (props) => {

    const user = useSelector(selectUser);

    const patient = props.chat.users.find(user => user.roles.includes('patient'));

    const cutText = (text) => {
        return text.length > 20 ? text.substr(20) + '...' : text;
    }

    const fineDate = (dateText) => {
        return new Date(dateText).toUTCString();
    }

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('chatroom', {chat_id: props.chat._id})}
            >
            <View style={{
                flexDirection: 'row',
                borderBottomWidth: 0.2,
                borderColor: colors.ashGrey,
                paddingVertical: '2%',
            }}>
                <View 
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: colors.iceberg,
                            fontWeight: '700',
                        }}>
                        {patient.complaint.doctor}
                    </Text>
                </View>
                <View 
                    style={{
                        flex: 2,
                        paddingLeft: '2%',
                    }}>
                    <View>
                        <Text 
                            style={{
                                fontSize: 20,
                            }}>
                            {cutText(patient.complaint.text)}
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 12,
                                color: colors.ashGrey,
                            }}>
                            {fineDate(patient.complaint.dateTime)}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ChatItem;
