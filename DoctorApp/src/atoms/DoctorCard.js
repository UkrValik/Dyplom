import React from 'react';
import { View, Text, Image, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors.json';
import { selectUser } from '../redux/reducers/user';
import fonts from '../styles/fonts.json';
import ModalUserDataModifier from './ModalUserDataModifier';

const DoctorCard = (props) => {

    const user = useSelector(selectUser);
    console.log(user);

    const [dataModalVisible, setDataModalVisible] = React.useState(false);

    return (
        <View>
            <Modal
                visible={dataModalVisible}
                >
                <ModalUserDataModifier 
                    setDataModalVisible={setDataModalVisible}
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
                    }}
                    >
                    <Image
                        source={require('/home/valentyn/Documents/Dyplom/DoctorApp/src/assets/avatar.png')}
                        resizeMode='cover'
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                        }}
                        />
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
