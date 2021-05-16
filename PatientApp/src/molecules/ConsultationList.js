import React from 'react';
import { ScrollView, View, Text, RefreshControl } from 'react-native';
import colors from '../style/colors.json';
import { useSelector, useDispatch } from 'react-redux';
import { selectProposals, getProposals } from '../redux/reducers/consultation';
import ConsultationItem from '../atoms/ConsultationItem';

const ConsultationList = (props) => {

    const consultationProposals = useSelector(selectProposals);
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getProposals());
        setTimeout(() => setRefreshing(false), 1000);
    }

    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: 'center',
                height: '100%',
            }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
            }
            >
            {consultationProposals.length > 0 ? 
                consultationProposals.map(proposition => {
                    return proposition.consultation.answer === undefined ?
                        <View key={proposition.consultation._id}>
                            <ConsultationItem
                                proposition={proposition}
                                />
                        </View>
                    :
                        <View key={proposition.consultation._id}></View>
                })
                :
                <View
                    style={{
                        alignItems: 'center',
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '500',
                            color: colors.iceberg,
                            textAlign: 'center',
                        }}
                        >
                        Тут будуть пропозиції провести консультації від лікарів
                    </Text>
                </View>
            }
        </ScrollView>
    );
}

export default ConsultationList;
