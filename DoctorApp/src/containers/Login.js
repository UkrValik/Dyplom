import React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Button, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../styles/colors.json';
import fonts from '../styles/fonts.json';
import { login, selectLoading, selectError, saveError } from '../redux/reducers/user';
import Loading from '../atoms/Loading';

const Login = (props) => {

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const errorOnLogin = useSelector(selectError);

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
        blurInput();
        dispatch(saveError(null));
        dispatch(login({username, password}));
    }

    const onTextFieldFocus = () => {
        setButtonMargin('80%');
        dispatch(saveError(null));
    }

    const onPressRegister = () => {
        dispatch(saveError(null));
        props.navigation.navigate('register');
    }

    let errorText = errorOnLogin ? 'Неправильний логін або пароль' : '';

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
                <View
                    style={{
                        marginBottom: '20%',
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: '900',
                            color: colors.iceberg,
                            fontFamily: fonts.ios,
                        }}
                        >
                        ДОДАТОК ЛІКАРЯ
                    </Text>
                </View>
                <View>
                    <Text style={{
                        fontFamily: fonts.ios,
                        fontSize: 20,
                        fontWeight: '700',
                        color: colors.tartorange,
                        textAlign: 'center',
                    }}>
                        {errorText}
                    </Text>
                </View>
                <View style={{
                    borderWidth: 0.5,
                    borderColor: colors.iceberg,
                    borderRadius: 5,
                    width: '80%',
                    marginVertical: '5%',
                    marginHorizontal: '10%',
                    paddingVertical: '2%',
                    paddingLeft: '2%',
                    marginBottom: '2%',
                    backgroundColor: '#FFF',
                    }}>
                    <TextInput
                        ref={loginField}
                        placeholder='Логін'
                        style={{fontSize: 16}}
                        onFocus={onTextFieldFocus}
                        onBlur={() => setButtonMargin('20%')}
                        onChangeText={(text) => setUsername(text)}
                        />
                </View>
                <View style={{
                    borderWidth: 0.5,
                    borderColor: colors.iceberg,
                    borderRadius: 5,
                    backgroundColor: '#FFF',
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
                        onFocus={onTextFieldFocus}
                        onBlur={() => setButtonMargin('20%')}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        />
                </View>
                <View
                    style={{
                        backgroundColor: '#FFF',
                        paddingHorizontal: '5%',
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: colors.iceberg,
                        marginBottom: '3%',
                    }}
                    >
                    <Button
                        title='Увійти'
                        color={colors.iceberg}
                        onPress={() => makeLogin(username, password)}
                        />
                </View>
                <View
                    style={{
                        // borderRadius: 5,
                        // borderWidth: 0.5,
                        // borderColor: colors.iceberg,
                        paddingHorizontal: '5%',
                        marginBottom: buttonMargin,
                        // backgroundColor: '#FFF',
                    }}
                    >
                    <Button
                        title='Зареєструватися'
                        color={colors.iceberg}
                        onPress={onPressRegister}
                        />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Login;
