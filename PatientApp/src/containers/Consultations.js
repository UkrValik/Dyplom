import React from 'react';
import { View, Text, SafeAreaView, } from 'react-native';
import ConsultationList from '../molecules/ConsultationList';
import colors from '../style/colors.json';
import { useDispatch } from 'react-redux';
import { getProposals } from '../redux/reducers/consultation';

const Consultations = (props) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            dispatch(getProposals());
        });
        return unsubscribe;
    });

    return (
        <View
            style={{
                // justifyContent: 'center',
                // alignItems: 'center',
                flex: 1,
                backgroundColor: colors.ivory,
            }}
            >
            <SafeAreaView>
                <View
                    style={{
                        borderBottomWidth: 3,
                        borderColor: colors.ashgrey,
                        paddingBottom: '3%',
                    }}
                    >
                    <Text
                        style={{
                            fontSize: 24,
                            textAlign: 'center',
                            fontWeight: '500',
                            color: colors.iceberg,
                        }}
                        >
                        Пропозиції
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: '3%',
                    }}
                    >
                    <ConsultationList />
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Consultations;
