import React from 'react';
import { ScrollView, View } from 'react-native';
import Comment from '../atoms/Comment';

const DoctorHomeList = (props) => {

    return (
        <ScrollView>
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
