import React from 'react';
import { View, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import colors from '../style/colors.json';
import doctors from '../assets/doctors.json';
import ComplaintInput from '../atoms/ComplaintInput';
import ComplaintDropdown from '../atoms/ComplaintDropdown';
import ComplaintButtons from '../atoms/ComplaintButtons';

const Complaint = (props) => {


    const inputRef = React.useRef();

    const blurInput = () => {
        inputRef.current.blur();
    }

    return (
        <TouchableWithoutFeedback onPress={blurInput}>
            <View style={{
                backgroundColor: colors.ivory,
                flex: 1,
                }}>
                <SafeAreaView>
                    <View>
                        <ComplaintInput
                            inputRef={inputRef}
                            />
                        <ComplaintDropdown
                            doctors={doctors}
                            />
                        <ComplaintButtons />
                    </View>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Complaint;
