import React from 'react';
import { View, Button, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../styles/colors.json';
import { selectUser, saveFirstname, saveLastname, updateUserData } from '../redux/reducers/user';

const ModalUserDataModifier = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const firstRef = React.useRef();
    const lastRef = React.useRef();
    const [buttonMargin, setButtonMargin] = React.useState('10%');

    const sendUserData = () => {
        const params = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
        };
        dispatch(updateUserData(params));
        props.setDataModalVisible(false);
    }

    const blurInput = () => {
        firstRef.current.blur();
        lastRef.current.blur();
    }

    return (
        <TouchableWithoutFeedback onPress={() => blurInput()}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: colors.ivory,
                }}
                >
                <View
                    style={{
                        backgroundColor: '#FFF',
                        borderWidth: 0.5,
                        borderColor: colors.ashGrey,
                        borderRadius: 5,
                        paddingLeft: '3%',
                        width: '80%',
                    }}
                    >
                    <TextInput
                        style={{height: 40, fontSize: 18}}
                        ref={firstRef}
                        placeholder='Вкажіть імʼя'
                        value={user.firstname}
                        onBlur={() => setButtonMargin('10%')}
                        onFocus={() => setButtonMargin('50%')}
                        onChangeText={(text) => dispatch(saveFirstname(text))}
                        />
                </View>
                <View
                    style={{
                        marginVertical: '5%',
                        backgroundColor: '#FFF',
                        borderWidth: 0.5,
                        borderColor: colors.ashGrey,
                        borderRadius: 5,
                        paddingLeft: '3%',
                        width: '80%',
                    }}
                    >
                    <TextInput
                        style={{height: 40, fontSize: 18}}
                        ref={lastRef}
                        placeholder='Вкажіть прізвище'
                        value={user.lastname}
                        onBlur={() => setButtonMargin('10%')}
                        onFocus={() => setButtonMargin('50%')}
                        onChangeText={(text) => dispatch(saveLastname(text))}
                        />
                </View>
                <View
                    style={{
                        marginTop: '5%',
                        marginBottom: buttonMargin
                    }}
                    >
                    <Button
                        title='Зберегти'
                        color={colors.ashGrey}
                        onPress={() => sendUserData()}
                        />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default ModalUserDataModifier;
