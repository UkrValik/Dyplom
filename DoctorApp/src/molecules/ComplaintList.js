import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import fonts from '../styles/fonts.json';
import ComplaintItem from '../atoms/ComplaintItem';

const ComplaintList = (props) => {

    return (
        <View style={{flex: 1}}>
            <View style={{
                flexDirection: 'row',
                marginTop: '3%',
                paddingBottom: '2%',
                borderBottomWidth: 2,
                borderColor: '#C0C5BE',
                }}>
                <Text style={{
                    fontFamily: fonts.ios,
                    fontSize: 20,
                    textAlign: 'center',
                    flex: 1,
                    }}>
                    Спеціаліст
                </Text>
                <Text style={{
                    fontFamily: fonts.ios,
                    fontSize: 20,
                    flex: 2,
                    }}>
                    Скарги
                </Text>
            </View>
            <ScrollView>
                {props.complaints.map(complaint => (
                    <ComplaintItem
                        key={complaint._id}
                        complaint={complaint}
                        showFullId={props.showFullId}
                        setId={props.setId}
                        />
                ))}
            </ScrollView>
        </View>
    );
}

export default ComplaintList;
