import React from 'react';
import { View, Text, Modal, ScrollView, TouchableNativeFeedback, Button, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import colors from '../style/colors.json';
import { saveComplaintDoctor, selectComplaint } from '../redux/reducers/user';

const ComplaintDropdown = (props) => {

    const dispatch = useDispatch();
    const complaint = useSelector(selectComplaint);

    const [modalVisible, setModalVisible] = React.useState(false);
    const [complaintDoctor, setComplaintDoctor] = React.useState(complaint.doctor);

    const onPress = (doctorLabel) => {
        setModalVisible(!modalVisible);
        setComplaintDoctor(doctorLabel);
        dispatch(saveComplaintDoctor(doctorLabel));
    }

    return (
        <View>
            <View
                style={{
                    marginLeft: '14%',
                    marginBottom: '1%',
                }}
                >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: '500',
                    }}
                    >
                    Оберіть лікаря
                </Text>
            </View>
            <View>
                <Modal
                    visible={modalVisible}
                    >
                    <SafeAreaView>
                        <ScrollView>
                            {props.doctors.map(doctor => (
                                <View
                                    key={doctor.value}
                                    style={{
                                        backgroundColor: '#FFF',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingVertical: '3%',
                                    }}
                                    >
                                    <Button
                                        title={doctor.label}
                                        onPress={() => onPress(doctor.label)}
                                        color='#000'
                                        />
                                </View>
                            ))}
                        </ScrollView>
                    </SafeAreaView>
                </Modal>
                <TouchableNativeFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: '#FFF',
                            width: '80%',
                            height: 40,
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderColor: colors.ashgrey,
                            borderWidth: 0.5,
                            borderRadius: 5,
                            paddingLeft: '4%',
                            paddingRight: '2%',
                        }}
                        >
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                            >
                            {complaintDoctor || complaint.doctor || 'Не знаю'}
                        </Text>
                        <Ionicons
                            name='ios-chevron-forward-outline'
                            size={20}
                            color={colors.ashgrey}
                            />
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}

export default ComplaintDropdown;
