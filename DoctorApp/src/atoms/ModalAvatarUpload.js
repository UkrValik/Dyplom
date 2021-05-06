import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, Button, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { selectUser, uploadAvatar } from '../redux/reducers/user';
import colors from '../styles/colors.json';
import { baseUrl } from '../config.json';

const ModalAvatarUpload = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const uri = baseUrl + '/user/' + user._id + '/avatar';

    const [image, setImage] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }

        const localUri = result.uri;
        const filename = localUri.split('/').pop();

        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('file', {uri: localUri, name: filename, type});

        dispatch(uploadAvatar({user_id: user._id, formData}));
    };

    return (
        <View
            style={{
                marginTop: '10%',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
            >
            {
                user.avatar &&
                <View>
                    <Image
                        source={{uri: image || uri}}
                        resizeMode='contain'
                        style={{
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').width * 1.7,
                        }}
                        />
                </View>
            }
            <View
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 10,
                }}
                >
                <Ionicons
                    name='close-circle-outline'
                    size={24}
                    color={colors.iceberg}
                    onPress={() => props.setAvatarModalVisible(false)}
                    />
            </View>
            <View
                style={{
                    marginVertical: '7%',
                    borderRadius: 5,
                    borderColor: colors.ashGrey,
                    borderWidth: 0.5,
                    backgroundColor: '#FFF',
                    width: '80%',
                    justifyContent: 'center',
                }}
                >
                <Button
                    title='Змінити фото'
                    color={colors.iceberg}
                    onPress={pickImage}
                    />
            </View>
        </View>
    );
}

export default ModalAvatarUpload;
