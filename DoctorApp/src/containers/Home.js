import React from 'react';
import { RefreshControl, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import doctor from '../assets/doctor.json';
import comments from '../assets/comments.json';
import DoctorHomeList from '../molecules/DoctorHomeList';
import DoctorCard from '../molecules/DoctorCard';
import { refreshUser, selectUser } from '../redux/reducers/user';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../styles/colors.json';

const Home = (props) => {

    let user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        dispatch(refreshUser({user_id: user._id}));
        setRefreshing(false);
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#FEFDEB',
            }}
            >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.iceberg}
                        />
                }
                >
                <DoctorCard doctor={doctor} />
                <DoctorHomeList doctor={doctor} comments={comments} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;
