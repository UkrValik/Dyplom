import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectDoctors } from '../redux/reducers/doctors';
import DoctorsItem from '../atoms/DoctorsItem';

const DoctorsList = (props) => {

    const doctors = useSelector(selectDoctors);

    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: 'center',
            }}
            >
            {doctors.map(doctor => (
                <DoctorsItem
                    key={doctor._id}
                    doctor={doctor}
                    />
            ))}
        </ScrollView>
    );
}

export default DoctorsList;
