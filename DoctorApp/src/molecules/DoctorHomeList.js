import React from 'react';
import { ScrollView, View } from 'react-native';
import DoctorInfo from '../atoms/DoctorInfo';
import Comment from '../atoms/Comment';

const DoctorHomeList = (props) => {

    return (
        <ScrollView>
            <DoctorInfo doctor={props.doctor} />
            <View style={{marginTop: '2%'}}>
                {props.comments.map(comment => 
                    <Comment 
                        comment={comment}
                        key={comment.id}
                        />
                )}
            </View>
        </ScrollView>
    );
}

export default DoctorHomeList;
