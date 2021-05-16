import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectChats } from '../redux/reducers/chats';
import colors from '../style/colors.json';
import ChatItem from '../atoms/ChatItem';

const ChatList = (props) => {

    const chats = useSelector(selectChats);

    return (
        <ScrollView
            contentContainerStyle={{
                width: '100%',
                borderColor: colors.ashgrey,
                borderTopWidth: 0.2,
                height: '100%',

            }}>
            {chats.length > 0 ? 
                chats.map(chat => 
                <View key={chat._id}>
                    <ChatItem
                        chat={chat}
                        navigation={props.navigation}
                        />
                </View>)
            :
                <Text
                    style={{
                        textAlign: 'center',
                        color: colors.iceberg,
                        fontSize: 20,
                        fontWeight: '500',
                    }}>
                    Тут будуть чати
                </Text>
            }
        </ScrollView>
    );
}

export default ChatList;
