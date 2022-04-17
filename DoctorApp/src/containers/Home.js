import React from 'react';
import { RefreshControl, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import doctor from '../assets/doctor.json';
import comments from '../assets/comments.json';
import DoctorHomeList from '../molecules/DoctorHomeList';
import DoctorCard from '../molecules/DoctorCard';
import DoctorInfo from '../atoms/DoctorInfo';
import { refreshUser, selectUser } from '../redux/reducers/user';
import { selectDocuments, getAllDocuments } from '../redux/reducers/documents';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../styles/colors.json';
import DoctorDocumentsArea from '../molecules/DoctorDocumentsArea';

const Home = (props) => {

    let user = useSelector(selectUser);
    let documents = useSelector(selectDocuments) || [];
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = React.useState(false);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(getAllDocuments({user_id: user._id}));
        });
        return unsubscribe;
    }, [props.navigation]);

    const onRefresh = async () => {
        setRefreshing(true);
        dispatch(refreshUser({user_id: user._id}));
        dispatch(getAllDocuments({user_id: user._id}));
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
                <DoctorInfo doctor={doctor} />
                <DoctorDocumentsArea navigation={props.navigation} documents={documents} />
                <DoctorHomeList doctor={doctor} comments={comments} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;
