import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableNativeFeedback, Modal } from 'react-native';
import { register, selectLoading } from '../redux/reducers/user';
import Loading from '../atoms/Loading';

const Register = (props) => {

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    let loginRef = React.createRef();
    let passwordRef = React.createRef();
    let passwordCopyRef = React.createRef();
    let [buttonMargin, setButtonMargin] = React.useState('10%');
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [passwordCopy, setPasswordCopy] = React.useState('');

    const blurInput = () => {
        loginRef.current.blur();
        passwordRef.current.blur();
        passwordCopyRef.current.blur();
    }

    const makeRegistration = (username, pass1, pass2) => {
        if (pass1 === pass2) {
            dispatch(register({username, password: pass1}));
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => blurInput()}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
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
                        ref={loginRef}
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
                    marginBottom: '2%',
                    }}>
                    <TextInput
                        ref={passwordRef}
                        placeholder='Пароль'
                        style={{fontSize: 16}}
                        onFocus={() => setButtonMargin('80%')}
                        onBlur={() => setButtonMargin('20%')}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        />
                </View>
                <View style={{
                    borderWidth: 0.5,
                    width: '80%',
                    marginVertical: '5%',
                    marginHorizontal: '10%',
                    paddingVertical: '2%',
                    paddingLeft: '2%',
                    }}>
                    <TextInput
                        ref={passwordCopyRef}
                        placeholder='Повторіть пароль'
                        style={{fontSize: 16}}
                        onFocus={() => setButtonMargin('80%')}
                        onBlur={() => setButtonMargin('20%')}
                        onChangeText={(text) => setPasswordCopy(text)}
                        secureTextEntry
                        />
                </View>
                <TouchableNativeFeedback onPress={() => makeRegistration(username, password, passwordCopy)}>
                    <View style={{
                        borderRadius: 10,
                        backgroundColor: '#77ABCF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '15%',
                        marginBottom: '5%',
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
                <TouchableNativeFeedback onPress={() => props.navigation.goBack()}>
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
                            Назад
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Register;