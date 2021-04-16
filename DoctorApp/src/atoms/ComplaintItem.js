import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import fonts from '../styles/fonts.json';
import colors from '../styles/colors.json';

const ComplaintItem = (props) => {

    const date = (date) => {
        if (new Date().getTime() - new Date(date).getTime() > 84600000) {
            return date.replaceAll('-', '.').replace('T', ' ').replace('Z', '');
        } else {
            let newDate = new Date().getTime() - new Date(date).getTime();
            let comment = 'тому';
            if (newDate < 60000) {
                newDate = Math.floor(newDate / 1000);
                if (newDate % 10 === 1 && Math.floor(newDate / 10) !== 1) {
                    comment = ' секунду ' + comment;
                } else if (newDate % 10 < 5 && newDate % 10 !== 0 && Math.floor(newDate / 10) !== 1) {
                    comment = ' секунди ' + comment;
                } else {
                    comment = ' секунд ' + comment;
                }
            } else if (newDate < 3600000) {
                newDate = Math.floor(newDate / 60000);
                if (newDate % 10 === 1 && Math.floor(newDate / 10) !== 1) {
                    comment = ' хвилину ' + comment;
                } else if (newDate % 10 < 5 && newDate % 10 !== 0 && Math.floor(newDate / 10) !== 1) {
                    comment = ' хвилини ' + comment;
                } else {
                    comment = ' хвилин ' + comment;
                }
            } else {
                newDate = Math.floor(newDate / 3600000);
                if (newDate % 10 === 1 && Math.floor(newDate / 10) !== 1) {
                    comment = ' годину ' + comment;
                } else if (newDate % 10 < 5 && newDate % 10 !== 0 && Math.floor(newDate / 10) !== 1) {
                    comment = ' години ' + comment;
                } else {
                    comment = ' годин ' + comment;
                }
            }
            return [newDate, comment];
        }
    }

    const text = (text, showFull) => {
        if (props.complaint.text.length > 30 && !showFull) {
            return props.complaint.text.substr(0, 27) + '...';
        } else {
            return text;
        }
    }

    const onPress = () => {
        if (props.complaint.id === props.showFullId) {
            props.setId(undefined);
        } else {
            props.setId(props.complaint.id);
        }
    }

    return (
        <TouchableNativeFeedback onPress={() => onPress()}>
            <View style={{
                paddingVertical: '2%',
                borderBottomWidth: 1,
                marginHorizontal: '2%',
                borderColor: colors.ashGrey,
                }}>
                <Text style={{
                    fontFamily: fonts.ios,
                    fontSize: 10,
                    marginRight: '3%',
                    textAlign: 'right',
                    }}>
                    {date(props.complaint.date)}
                </Text>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        }}>
                        <Text style={{
                            fontFamily: fonts.ios,
                            fontSize: 18,
                            fontWeight: '400',
                            flex: 1,
                            textAlign: 'center',
                            }}>
                            {props.complaint.doctor}
                        </Text>
                        <View style={{
                            borderWidth: 0.5,
                            borderColor: colors.ashGrey,
                            marginLeft: -10,
                            }}>
                        </View>
                        <Text style={{
                            marginLeft: 10,
                            fontFamily: fonts.ios,
                            fontSize: 16,
                            flex: 2,
                            }}>
                            {text(props.complaint.text, props.showFullId === props.complaint.id)}
                        </Text>
                    </View>
                    {props.showFullId === props.complaint.id && <TouchableNativeFeedback>
                        <View style={{
                            alignItems: 'center',
                            marginVertical: 10,
                            }}>
                            <View style={{borderRadius: 5, backgroundColor: colors.iceberg}}>
                                <Text style={{
                                    fontFamily: fonts.ios,
                                    fontSize: 16,
                                    padding: 5,
                                    }}>
                                    Запропонувати консультацію
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>}
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

export default ComplaintItem;
