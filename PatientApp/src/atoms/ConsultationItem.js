import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, Button } from 'react-native';
import colors from '../style/colors.json';
import { baseUrl } from '../config.json';
import { useDispatch, useSelector } from 'react-redux';
import { answer } from '../redux/reducers/consultation';
import { selectUser } from '../redux/reducers/user';

const ConsultationItem = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const uri = baseUrl + '/user/doctor-avatar/' + props.proposition.avatar.split('avatars/')[1];

    const patientAnswer = (userAnswer) => {
        const params = {
            answer: userAnswer,
            consult_id: props.proposition.consultation._id,
            doctor_id: props.proposition._id,
            patient_id: user._id,
        };
        dispatch(answer(params));
    }

    return (
        <View
            style={{
                width: '100%',
                backgroundColor: '#FFF',
                borderColor: colors.ashgrey,
                borderWidth: 0.5,
                borderRadius: 5,
            }}
            >
            <View
                style={{
                    flexDirection: 'row',
                    width: '95%',
                    marginBottom: '2.5%',
                    paddingVertical: '2%',
                }}
                >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                    >
                    <Image
                        source={{
                            uri: uri,
                        }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100,
                        }}
                        resizeMode='contain'
                        />
                </View>
                <View
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                    }}
                    >
                    <View
                        style={{
                            marginBottom: '1%',
                        }}
                        >
                        <Text
                            style={{
                                fontSize: 20,
                            }}
                            >
                            {props.proposition.firstname}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: '1%',
                        }}
                        >
                        <Text
                            style={{
                                fontSize: 20,
                            }}
                            >
                            {props.proposition.lastname}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flex: 0.25,
                        alignSelf: 'center',
                    }}
                    >
                    <Ionicons
                        name='chevron-forward'
                        size={20}
                        />
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
                >
                <View
                    style={{
                        marginBottom: '5%',
                        height: 40,
                        backgroundColor: '#FFF',
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: colors.tartorange,
                    }}
                    >
                    <Button
                        title='Відхилити'
                        color={colors.tartorange}
                        onPress={() => patientAnswer(false)}
                        />
                </View>
                <View
                    style={{
                        marginBottom: '5%',
                        height: 40,
                        backgroundColor: '#FFF',
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: colors.yellowgreen,
                    }}
                    >
                    <Button
                        title='Прийняти'
                        color={colors.yellowgreen}
                        onPress={() => patientAnswer(true)}
                        />
                </View>
            </View>
        </View>
    );
}

export default ConsultationItem;
