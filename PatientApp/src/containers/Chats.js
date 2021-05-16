import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../style/colors.json';
import { getChats } from '../redux/reducers/chats';
import ChatList from '../molecules/ChatList';

const Chats = (props) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(getChats());
        });

        return unsubscribe;
    }, [props.navigation]);

    return (
        <View
            style={{
                backgroundColor: colors.iceberg,
                flex: 1,
            }}>
            <SafeAreaView>
                <View
                    style={{
                        borderTopWidth: 2,
                        borderColor: colors.iceberg,
                        backgroundColor: colors.ivory,
                    }}>
                    <ChatList navigation={props.navigation} />
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Chats;
