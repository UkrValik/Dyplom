import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, TouchableWithoutFeedback, Button, Modal } from 'react-native';
import colors from '../styles/colors.json';
import fonts from '../styles/fonts.json';
import { register, selectError, selectLoading, saveError } from '../redux/reducers/user';
import Loading from '../atoms/Loading';

const Register = (props) => {

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const errorOnRegister = useSelector(selectError);

    let loginRef = React.createRef();
    let passwordRef = React.createRef();
    let passwordCopyRef = React.createRef();
    let [buttonMargin, setButtonMargin] = React.useState('10%');
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [passwordCopy, setPasswordCopy] = React.useState('');
    let [passwordsDiffer, setPasswordsDiffer] = React.useState(false);

    const blurInput = () => {
        loginRef.current.blur();
        passwordRef.current.blur();
        passwordCopyRef.current.blur();
    }

    const makeRegistration = (username, pass1, pass2) => {
        blurInput();
        dispatch(saveError(null));
        if (pass1 === pass2) {
            setPasswordsDiffer(false);
            dispatch(register({username, password: pass1}));
        } else {
            setPasswordsDiffer(true);
        }
    }

    const onTextFieldFocus = () => {
        setButtonMargin('80%');
        dispatch(saveError(null));
    }

    const onGoBack = () => {
        dispatch(saveError(null));
        props.navigation.goBack();
    }

    let errorText = passwordsDiffer ? 'Паролі не співпадають' : '';
    errorText = errorOnRegister ? 'Користувач з таким логіном вже існує' : errorText;

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
                    backgroundColor: '#FFF',
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
                    marginBottom: '2%',
                    }}>
                    <TextInput
                        ref={passwordRef}
                        placeholder='Пароль'
                        style={{fontSize: 16}}
                        onFocus={onTextFieldFocus}
                        onBlur={() => setButtonMargin('20%')}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
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
                        ref={passwordCopyRef}
                        placeholder='Повторіть пароль'
                        style={{fontSize: 16}}
                        onFocus={onTextFieldFocus}
                        onBlur={() => setButtonMargin('20%')}
                        onChangeText={(text) => setPasswordCopy(text)}
                        secureTextEntry
                        />
                </View>
                <View
                    style={{
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: colors.iceberg,
                        paddingHorizontal: '5%',
                        backgroundColor: '#FFF',
                        marginBottom: '3%',
                    }}
                    >
                    <Button
                        title='Зареєструватися'
                        color={colors.iceberg}
                        onPress={() => makeRegistration(username, password, passwordCopy)}
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
                        title='Назад'
                        color={colors.iceberg}
                        onPress={onGoBack}
                        />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Register;
