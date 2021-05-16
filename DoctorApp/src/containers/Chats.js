import React from 'react';
import { SafeAreaView, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../styles/colors.json';
import { getChats, selectChats } from '../redux/reducers/chats';
import ChatList from '../molecules/ChatList';

const Chats = (props) => {

    const dispatch = useDispatch();
    const chats = useSelector(selectChats);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(getChats());
        });
        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={{
            backgroundColor: colors.ivory,
            flex: 1,
        }}>
            <SafeAreaView>
                <View
                    style={{
                        borderTopColor: colors.ashGrey,
                        borderTopWidth: 2,
                    }}>
                    <ChatList
                        navigation={props.navigation}
                        />
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Chats;
