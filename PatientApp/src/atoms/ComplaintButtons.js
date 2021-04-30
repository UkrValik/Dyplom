import React from 'react';
import { Button, Modal, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../style/colors.json';
import { publishComplaintData, selectComplaint, publishComplaint, hideComplaint } from '../redux/reducers/user';

const ComplaintButtons = (props) => {

    const dispatch = useDispatch();
    const complaint = useSelector(selectComplaint);

    const [modalVisible, setModalVisible] = React.useState(false);

    const publishData = () => {
        dispatch(publishComplaintData(complaint));
        setModalVisible(true);
    }

    const publish = () => {
        dispatch(publishComplaint());
        setModalVisible(false);
    }

    const hide = () => {
        dispatch(hideComplaint());
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '10%',
                marginTop: '60%',
            }}
            >
            <Modal
                visible={modalVisible}
                transparent
                >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        backgroundColor: colors.ivory + 'dd',
                    }}
                    >
                    <Text
                        style={{
                            marginBottom: '2%',
                            fontSize: 20,
                        }}
                        >
                        Дані буде опубліковано
                    </Text>
                    <Text
                        style={{
                            marginBottom: '5%',
                            fontSize: 20,
                        }}
                        >
                        Лікарі зможуть їх бачити
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '80%',
                            marginTop: '80%',
                        }}
                        >
                        <View
                            style={{
                                height: 40,
                                width: '45%',
                                backgroundColor: '#FFF',
                                borderRadius: 5,
                                borderColor: colors.ashgrey,
                                borderWidth: 0.5,
                            }}
                            >
                            <Button
                                title='Відмінити'
                                onPress={() => setModalVisible(false)}
                                color={colors.tartorange}
                                />
                        </View>
                        <View
                            style={{
                                height: 40,
                                width: '45%',
                                backgroundColor: '#FFF',
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: colors.ashgrey,
                            }}
                            >
                            <Button
                                title='Підтвердити'
                                onPress={() => publish()}
                                color={colors.yellowgreen}
                                />
                        </View>
                    </View>
                </View>
            </Modal>
            <View
                style={{
                    backgroundColor: '#FFF',
                    height: 40,
                    borderWidth: 0.5,
                    borderColor: colors.ashgrey,
                    borderRadius: 5,
                    width: '45%',
                }}
                >
                <Button
                    title='Приховати'
                    color={colors.iceberg}
                    onPress={() => hide()}
                    />
            </View>
            <View
                style={{
                    backgroundColor: '#FFF',
                    height: 40,
                    borderWidth: 0.5,
                    borderColor: colors.ashgrey,
                    borderRadius: 5,
                    width: '45%',
                }}
                >
                <Button
                    title='Опублікувати'
                    color={colors.iceberg}
                    onPress={() => publishData()}
                    />
            </View>
        </View>
    );
}

export default ComplaintButtons;
