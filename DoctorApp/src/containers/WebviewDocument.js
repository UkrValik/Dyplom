import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import config from '../config.json';

const WebviewDocument = (props) => {

    const document_id = props.route.params.document_id;

    return (
        <WebView
            source={{uri: config.baseUrl + '/documents/get/' + document_id }}
        />
    );

}

export default WebviewDocument;
