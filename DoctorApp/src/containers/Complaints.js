import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComplaints, selectComplaints } from '../redux/reducers/user';
// import complaints from '../assets/complaints.json';
import colors from '../styles/colors.json';
import ComplaintList from '../molecules/ComplaintList';

const Complaints = (props) => {

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(getAllComplaints());
        });
        return unsubscribe;
    }, [props.navigation]);

    const dispatch = useDispatch();
    const complaints = useSelector(selectComplaints);

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
