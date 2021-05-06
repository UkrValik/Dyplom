import React from 'react';
import { View, Text, Image, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors.json';
import { selectUser } from '../redux/reducers/user';
import fonts from '../styles/fonts.json';
import ModalUserDataModifier from '../atoms/ModalUserDataModifier';
import ModalAvatarUpload from '../atoms/ModalAvatarUpload';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { baseUrl } from '../config.json';

const DoctorCard = (props) => {

    const user = useSelector(selectUser);
    const uri = baseUrl + '/user/' + user._id + '/avatar';

    const [dataModalVisible, setDataModalVisible] = React.useState(false);
    const [avatarModalVisible, setAvatarModalVisible] = React.useState(false);

    return (
        <View>
            <Modal
                visible={dataModalVisible}
                >
                <ModalUserDataModifier 
                    setDataModalVisible={setDataModalVisible}
                    />
            </Modal>
            <Modal visible={avatarModalVisible}>
                <ModalAvatarUpload
                    setAvatarModalVisible={setAvatarModalVisible}
                    />
            </Modal>
            <View
                style={{
                    paddingVertical: '3%',
                    flexDirection: 'row',
                    backgroundColor: '#fff'
                }}
                >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                    {user.avatar ?
                        <TouchableWithoutFeedback onPress={() => setAvatarModalVisible(true)}>
                            <Image
                                source={{
                                    uri: uri,
                                    headers: {
                                        some: user.avatar,
                                    }
                                }}
                                resizeMode='cover'
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                }}
                                />
                        </TouchableWithoutFeedback>
                    :
                        <Ionicons
                            name='add'
                            size={100}
                            color={colors.iceberg}
                            onPress={() => setAvatarModalVisible(true)}
                            />
                    }
                </View>
                <View
                    style={{
                        flex: 2,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}
                    >
                    <Text
                        style={{
                            fontFamily: fonts.ios,
                            fontSize: 20,
                            fontWeight: '700',
                        }}
                        >
                        {user.firstname || 'вкажіть імʼя'}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.ios,
                            fontSize: 20,
                            fontWeight: '700',
                        }}
                        >
                        {user.lastname || 'вкажіть прізвище'}
                    </Text>
                </View>
                <View
                    style={{
                    }}
                    >
                    <Ionicons
                        style={{padding: 10}}
                        name='md-reader-outline'
                        size={24}
                        color={colors.iceberg}
                        onPress={() => setDataModalVisible(true)}
                        />
                </View>
            </View>
            <View style={{backgroundColor: '#FFF'}}>
                <Text style={{
                    fontSize: 16,
                    fontFamily: fonts.ios,
                    marginLeft: '12.5%',
                    marginBottom: '2%',
                    }}>
                    {props.doctor.price}₴
                </Text>
            </View>
        </View>
    );
}

export default DoctorCard;
