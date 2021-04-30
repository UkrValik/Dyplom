import React from 'react';
import { View, Text, TextInput } from 'react-native';
import colors from '../style/colors.json';
import { useSelector, useDispatch } from 'react-redux';
import { selectComplaint, saveComplaintText } from '../redux/reducers/user';

const ComplaintInput = (props) => {

    const complaint = useSelector(selectComplaint);
    const dispatch = useDispatch();

    return (
        <View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '500',
                    }}
                    >
                    Опишіть ваші скарги
                </Text>
            </View>
            <View
                style={{
                    marginTop: '2%',
                    marginBottom: '5%',
                    marginHorizontal: '10%',
                    backgroundColor: '#FFF'
                }}
                >
                <TextInput
                    multiline={true}
                    ref={props.inputRef}
                    placeholder='Болить, ниє, колить, непокоїть, температура...'
                    value={complaint.text}
                    onChangeText={(text) => dispatch(saveComplaintText(text))}
                    style={{
                        borderWidth: 0.5,
                        borderColor: colors.ashgrey,
                        borderRadius: 5,
                        fontSize: 16,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 15,
                        minHeight: '40%',
                        maxHeight: '100%',
                    }}
                    />
            </View>
        </View>
    );
}

export default ComplaintInput;
