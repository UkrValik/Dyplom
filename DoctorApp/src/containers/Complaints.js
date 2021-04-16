import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import complaints from '../assets/complaints.json';
import colors from '../styles/colors.json';
import ComplaintList from '../molecules/ComplaintList';

const Complaints = (props) => {

    const [showFullId, setId] = useState(undefined);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.ivory,
            }}
            >
            <ComplaintList
                complaints={complaints}
                showFullId={showFullId}
                setId={setId}
                />
        </SafeAreaView>
    );
}

export default Complaints;
