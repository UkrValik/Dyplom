import React from 'react';
import { Text, View, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocument, selectDocuments, deleteDocument } from '../redux/reducers/documents';
import colors from '../styles/colors.json';
import fonts from '../styles/fonts.json';

const UploadDocuments = (props) => {

    const dispatch = useDispatch();
    const docs = useSelector(selectDocuments);

    let documents = [...docs];
    while (documents.length < 5) {
        documents.push({
            _id: documents.length,
        });
    }

    const navigateBack = () => {
        props.navigation.goBack();
    }

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf'});
        if (result.type === 'success') {
            const doc = {
                name: result.name,
                uri: result.uri,
                type: 'application/pdf',
            };
            const formData = new FormData();
            formData.append('file', doc);
            dispatch(uploadDocument({formData}));
        }
    }

    const deleteDocumentById = async (document_id) => {
        dispatch(deleteDocument({document_id}));
    }

    const cutName = (name) => {
        if (name) {
            name = name.length > 30 ? name.substr(0, 30) : name;
        }
        return name;
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'space-around',
                backgroundColor: colors.ivory,
            }}
        >
            {documents.map(doc => 
                <View
                    key={doc._id}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: '2%',
                        paddingLeft: '2%',
                        borderWidth: 1,
                        borderColor: colors.ashGrey,
                        borderRadius: 5,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: fonts.ios,
                            fontSize: 16,
                        }}
                    >
                        {cutName(doc.name) || 'Вільно'}
                    </Text>
                    <View
                        style={doc.name ? {} : {
                            backgroundColor: '#FFF',
                            borderRadius: 5,
                            borderColor: colors.ashGrey,
                            borderWidth: 0.5,
                        }}
                    >
                        <Button
                            title={doc.name ? 'Видалити' : 'Завантажити'}
                            color={doc.name ? colors.violet : colors.iceberg}
                            onPress={doc.name ? () => deleteDocumentById(doc._id) : pickDocument}
                        />
                    </View>
                </View>    
            )}
            <View>
                <Button
                    title='Назад'
                    color={colors.violet}
                    onPress={navigateBack}
                />
            </View>
        </View>
    );

}

export default UploadDocuments;
