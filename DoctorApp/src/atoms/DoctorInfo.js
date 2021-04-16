import React from 'react';
import { View, Text } from 'react-native';
import fonts from '../styles/fonts.json';

const DoctorInfo = (props) => {

    return (
        <View>
            <View style={{backgroundColor: '#77ABCF', paddingVertical: 5,}}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#FEFDEB',
                    fontFamily: fonts.ios,
                    }}>
                    Всього консультацій:
                </Text>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#FEFDEB',
                    fontFamily: fonts.ios,
                    }}>
                    {props.doctor.consultations}
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                }}>
                <Text style={{
                    color: '#FEFDEB',
                    backgroundColor: '#FF333A',
                    flex: 1,
                    textAlign: 'center',
                    paddingVertical: 12,
                    fontSize: 18,
                    fontWeight: '700',
                    fontFamily: fonts.ios,
                    }}>
                    {props.doctor.negativeMarks}
                </Text>
                <Text style={{
                    color: '#FEFDEB',
                    backgroundColor: '#41A300',
                    flex: 1,
                    textAlign: 'center',
                    paddingVertical: 12,
                    fontSize: 18,
                    fontWeight: '700',
                    fontFamily: fonts.ios,
                    }}>
                    {props.doctor.positiveMarks}
                </Text>
            </View>
        </View>
    );
}

export default DoctorInfo;
