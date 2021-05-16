import React from 'react';
import { ScrollView, View, Text} from 'react-native';
import { useSelector } from 'react-redux';
import { selectChats } from '../redux/reducers/chats';
import colors from '../styles/colors.json';
import ChatItem from '../atoms/ChatItem';

const ChatList = (props) => {

    const chats = useSelector(selectChats);

    return (
        <ScrollView
            contentContainerStyle={{
                height: '100%',
                borderTopWidth: 0.2,
                borderTopColor: colors.ashGrey,
            }}>
            {chats.length > 0 ? 
                chats.map(chat => (
                    <View key={chat._id}>
                        <ChatItem
                            chat={chat}
                            navigation={props.navigation}
                            />
                    </View>
                ))
            :
                <View>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 24,
                        fontWeight: '500',
                        color: colors.iceberg,
                    }}>
                        Тут будуть Ваші чати
                    </Text>
                </View>
            }
        </ScrollView>
    );
}

export default ChatList;
