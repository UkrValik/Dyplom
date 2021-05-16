import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';
import colors from '../style/colors.json';
import { baseUrl } from '../config.json';

const DoctorsItem = (props) => {

    const uri = baseUrl + '/user/doctor-avatar/' + props.doctor.avatar.split('avatars/')[1];

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: '#FFF',
                borderColor: colors.ashgrey,
                borderWidth: 0.5,
                borderRadius: 5,
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
                        {props.doctor.firstname}
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
                        {props.doctor.lastname}
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
    );
}

export default DoctorsItem;
