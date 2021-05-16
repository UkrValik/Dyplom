import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/user';

const Home = (props) => {

    const user = useSelector(selectUser);

    return (
        <View style={{backgroundColor: '#FEFDEB', flex: 1}}>
            <SafeAreaView>
                <View style={{
                    marginVertical: '2%',
                    marginLeft: '5%',
                    }}>
                    <Text style={{
                        fontSize: 20,
                        }}>
                        {user.username}
                    </Text>
                </View>
                <View style={{
                    marginVertical: '2%',
                    marginLeft: '5%',
                    }}>
                    <Text style={{
                        fontSize: 20,
                        }}>
                        {user.complaint._id}
                    </Text>
                </View>
                <View style={{
                    marginVertical: '2%',
                    marginLeft: '5%',
                    }}>
                    <Text style={{
                        fontSize: 20,
                        }}>
                        {user._id}
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default Home;
