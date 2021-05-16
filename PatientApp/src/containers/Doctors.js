import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../style/colors.json';
import DoctorsList from '../molecules/DoctorsList';
import { getDoctors } from '../redux/reducers/doctors';

const Doctors = (props) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(getDoctors());
        });
        return unsubscribe;
    }, [props.navigation]);

    return (
        <View
            style={{
                backgroundColor: colors.ivory,
                flex: 1,
            }}
            >
            <SafeAreaView>
                <DoctorsList />
            </SafeAreaView>
        </View>
    );
}

export default Doctors;
