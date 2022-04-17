import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Button, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../styles/colors.json';
import fonts from '../styles/fonts.json';

const DoctorDocumentsArea = (props) => {

    const moveToUploadDocuments = () => {
        props.navigation.navigate('uploadDocuments');
    }

    const moveToWebviewDocument = (document_id) => {
        props.navigation.navigate('webviewDocument', {document_id})
    }
    
    return (
        <View>
            <Text
                style={{
                    textAlign: 'center',
                    marginVertical: '2%',
                    fontFamily: fonts.ios,
                    fontSize: 16,
                }}    
            >
                Документи
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: '2%',
                }}
            >
                {props.documents.length === 0 &&
                    <Text
                        style={{
                            fontFamily: fonts.ios,
                            flex: 2,
                        }}
                    >
                        Ще немає документів
                    </Text>
                }
                {props.documents.length > 0 &&
                    <View
                        style={{
                            flex: 2,
                            flexDirection: 'row',
                        }}
                    >
                        {props.documents.map(doc => 
                            <TouchableOpacity
                                key={doc._id}
                                style={{marginHorizontal: '5%'}}
                                onPress={() => moveToWebviewDocument(doc._id)}
                            >
                                <Ionicons
                                    name='document-text-outline'
                                    size={24}
                                    color={colors.iceberg}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                }
                <View
                    style={{
                        flex: 1,
                        marginVertical: '2%',
                        borderRadius: 5,
                        borderColor: colors.ashGrey,
                        borderWidth: 0.5,
                        backgroundColor: '#FFF',
                        width: '30%',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        title='Додати'
                        color={colors.iceberg}
                        disabled={props.documents.length === 5}
                        onPress={moveToUploadDocuments}
                    />
                </View>
            </View>
        </View>
    );

}

export default DoctorDocumentsArea;
