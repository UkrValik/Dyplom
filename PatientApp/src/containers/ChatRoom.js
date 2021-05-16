import React from 'react';
import { SafeAreaView, View, TextInput, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import MessageArea from '../atoms/MessageArea';
import colors from '../style/colors.json';
import { selectChats, saveMessage } from '../redux/reducers/chats';
import { baseUrl } from '../config.json';
import io from 'socket.io-client';

const ChatRoom = (props) => {

    const [keyboardHeight, setkeyboardHeight] = React.useState(5);
    const [message, setMessage] = React.useState('');
    const [socket, setSocket] = React.useState(undefined);

    const dispatch = useDispatch();
    const chats = useSelector(selectChats);
    const chat = chats.find(chat => chat._id === props.route.params.chat_id);

    React.useEffect(() => {
        Keyboard.addListener('keyboardWillShow', (e) => {
            setkeyboardHeight(e.endCoordinates.height - 30);
        });
        return Keyboard.removeListener('keyboardWillShow');
    }, [Keyboard]);

    React.useEffect(() => {
        Keyboard.addListener('keyboardWillHide', (e) => {
            setkeyboardHeight(0);
        });
        return Keyboard.removeListener('keyboardWillhide');
    }, [Keyboard]);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setSocket(io.connect(baseUrl, {
                transports: ['websocket'],
                reconnectionAttempts: 5,
            }).on('users', data => {
                console.log('data', data);
            }).on('message', data => {
                console.log('data', data);
                dispatch(saveMessage({chat_id: chat._id, message: data}));
            }).on('joinedRoom', data => {
                console.log('room', data);
            }).on('leftRoom', data => {
                console.log('room', data);
            }).emit('join', chat._id));
        });

        return unsubscribe;
    }, [props.navigation, socket]);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {
            socket.emit('leave', chat._id);
            socket.disconnect();
        });
        return unsubscribe;
    }, [props.navigation, socket]);

    const sendMessage = () => {
        socket.emit('message', {message: message, room: chat._id});
        setMessage('');
    }

    return (
        <View
            style={{
                backgroundColor: colors.iceberg,
                flex: 1,
            }}>
            <SafeAreaView>
                <View
                    style={{
                    }}>
                    <View
                        style={{
                            borderTopWidth: 2,
                            borderBottomWidth: 2,
                            borderColor: colors.ashgrey,
                        }}>
                        <MessageArea
                            keyboardHeight={keyboardHeight}
                            messages={chat.messages}/>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            marginTop: '5%',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>
                        <TextInput
                            value={message}
                            onChangeText={(text) => setMessage(text)}
                            placeholder='Пишіть тут'
                            style={{
                                width: '80%',
                                minHeight: 40,
                                maxHeight: 100,
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: colors.ashgrey,
                                paddingLeft: '2%',
                                backgroundColor: '#FFF',
                                fontSize: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}
                            multiline
                            keyboardAppearance='dark'
                            />
                        <Ionicons
                            name='send'
                            size={24}
                            color={colors.violet}
                            onPress={sendMessage}
                            />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default ChatRoom;
