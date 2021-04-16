import React from 'react';
import { View, Text, Image } from 'react-native';
import fonts from '../styles/fonts.json';

const DoctorCard = (props) => {

    const avatar = props.doctor.avatar;

    return (
        <View>
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
                        {props.doctor.firstName}
                    </Text>
                    <Text
                        style={{
                            fontFamily: fonts.ios,
                            fontSize: 20,
                            fontWeight: '700',
                        }}
                        >
                        {props.doctor.lastName}
                    </Text>
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
