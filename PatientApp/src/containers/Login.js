import React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableNativeFeedback, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectLoading } from '../redux/reducers/user';
import Loading from '../atoms/Loading';

const Login = (props) => {

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    let loginField = React.createRef();
    let passwordField = React.createRef();
    let [buttonMargin, setButtonMargin] = React.useState('10%');
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');

    const blurInput = () => {
        loginField.current.blur();
        passwordField.current.blur();
    }

    const makeLogin = (username, password) => {
        dispatch(login({username, password}));
    }

    return (
        <TouchableWithoutFeedback onPress={() => blurInput()}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: '#FEFDEB',
                }}>
                <Modal
                    visible={loading}
                    transparent
                    >
                    <Loading />
                </Modal>
                <View style={{
                    borderWidth: 0.5,
                    width: '80%',
                    marginVertical: '5%',
                    marginHorizontal: '10%',
                    paddingVertical: '2%',
                    paddingLeft: '2%',
                    marginBottom: '2%',
                    }}>
                    <TextInput
                        ref={loginField}
                        placeholder='Логін'
                        style={{fontSize: 16}}
                        onFocus={() => setButtonMargin('80%')}
                        onBlur={() => setButtonMargin('20%')}
                        onChangeText={(text) => setUsername(text)}
                        />
                </View>
                <View style={{
                    borderWidth: 0.5,
                    width: '80%',
                    marginVertical: '5%',
                    marginHorizontal: '10%',
                    paddingVertical: '2%',
                    paddingLeft: '2%',
                    marginBottom: '10%',
                    }}>
                    <TextInput
                        ref={passwordField}
                        placeholder='Пароль'
                        style={{fontSize: 16}}
                        onFocus={() => setButtonMargin('80%')}
                        onBlur={() => setButtonMargin('20%')}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        />
                </View>
                <TouchableNativeFeedback onPress={() => makeLogin(username, password)}>
                    <View style={{
                        borderRadius: 10,
                        backgroundColor: '#77ABCF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '5%',
                        marginBottom: '5%',
                        width: '30%',
                        paddingVertical: '2%',
                        }}>
                        <Text style={{
                            fontSize: 20,
                            }}>
                            Увійти
                        </Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => props.navigation.navigate('register')}>
                    <View style={{
                        borderRadius: 10,
                        backgroundColor: '#77ABCF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: buttonMargin,
                        paddingHorizontal: '10%',
                        paddingVertical: '2%',
                        }}>
                        <Text style={{
                            fontSize: 20,
                            }}>
                            Зареєструватися
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Login;
