import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import fonts from '../styles/fonts.json';

const Comment = (props) => {

    const date = props.comment.date.replaceAll('-', '.');

    return (
        <View style={{
            marginVertical: '1%',
            borderBottomWidth: 1,
            marginHorizontal: '2%'
            }}>
            {props.comment.hadConsultation ? 
                <Text style={styles.hadConsultationText}>
                    Клієнт проходив консультацію у цього лікаря
                </Text>
                :
                <Text style={styles.hadConsultationText}>
                    Клієнт НЕ проходив консультацію у цього лікаря
                </Text>}
            <View style={{
                flexDirection: 'row',
                marginVertical: '2%',
                }}>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.ios,
                    }}>
                    {date}
                </Text>
                <View style={{
                    borderRightWidth: 1,
                    marginLeft: -6,
                    marginRight: 6,
                    borderColor: '#C0C5BE',
                    }}></View>
                <Text style={{
                    flex: 3,
                    textAlign: 'left',
                    fontFamily: fonts.ios,
                    
                    }}>
                    {props.comment.text}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    hadConsultationText: {
        fontFamily: fonts.ios,
        fontSize: 8,
        marginLeft: '3%',
        color: '#768273'
    }
});

export default Comment;
