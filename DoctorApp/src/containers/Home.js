import React from 'react';
import { SafeAreaView } from 'react-native';
import doctor from '../assets/doctor.json';
import comments from '../assets/comments.json';
import DoctorHomeList from '../molecules/DoctorHomeList';
import DoctorCard from '../atoms/DoctorCard';

const Home = (props) => {

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#FEFDEB',
            }}
            >
            <DoctorCard doctor={doctor} />
            <DoctorHomeList doctor={doctor} comments={comments} />
        </SafeAreaView>
    );
}

export default Home;
