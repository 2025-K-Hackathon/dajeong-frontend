import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import styled from 'styled-components';
import { CustomHeader } from './../components';
import { Colors } from '../theme';
import Photo from '../../assets/images/community/photo.png';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibraryAsync } from 'expo-image-picker';
import axiosInstance from './../utils/axiosInstance';

const CommunityCreate = ({ navigation }) => {
    const [nationality, setNationality] = useState();
    const [ageGroup, setAgeGroup] = useState();
    const [region, setRegion] = useState();

    const [title, setTitle] = useState();
    const [imageName, setImageName] = useState();
    const [imageUri, setImageUri] = useState();
    const [content, setContent] = useState();
    const contentRef = useRef(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const fileName = uri.split('/').pop();
            setImageName(fileName);
            setImageUri(uri);
            console.log(fileName);
            console.log(uri);
        }
    }

    const handleInformation = async () => {
        try {
            const response = await axiosInstance.get('/api/users/me');
            console.log('내 정보 조회', response.data);
            setNationality(response.data.nationality);
            const age = response.data.age;
            if (age < 30) setAgeGroup('TWENTIES');
            else if (age < 40) setAgeGroup('THIRTIES');
            else if (age < 50) setAgeGroup('FORTIES');
            else if (age < 60) setAgeGroup('FIFTIES');
            else if (age >= 60) setAgeGroup('SIXTIES_OVER');
            else setAgeGroup('PRIVATE');
            setRegion(response.data.region);
        } catch(error) {
            console.log('내 정보 조회 실패', error.response);
        }
    }

    const submitPost = async () => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("nationality", nationality);
            formData.append("region", region);
            formData.append("ageGroup", ageGroup);
            if (imageUri) {
            const fileName = imageUri.split("/").pop();
                const fileType = fileName.split(".").pop();
                formData.append("images", {
                    uri: imageUri,
                    name: fileName,
                    type: `image/${fileType}`,
                });
            }
            const response = await axiosInstance.post('/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log('게시글 작성 성공', response);
            const postId = response.data.postId;
            navigation.navigate('CommunityDetail', { postId: postId } );
        } catch(error) {
            console.log('게시글 작성 실패', error.response);
        }
    }

    useEffect(() => {
        handleInformation();
    }, [])

    return (
        <Layout>
            <CustomHeader 
                type="text" 
                text="글 작성" 
                buttonText="게시하기"
                onPress={submitPost}
                onBackPress={() => navigation.navigate('CreateList')}
            />
            <Wrapper>
                <TitleInput 
                    placeholder='제목을 입력해 주세요.'
                    placeholderTextColor="#7F7C7C"
                    value={title}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setTitle}
                    returnKeyType="next"
                    onSubmitEditing={() => contentRef.current?.focus()}
                />
                <ImageWrapper>
                    <ImageButton onPress={pickImage}>
                        <ImageButtonText>사진 추가</ImageButtonText>
                        <Image source={Photo}/>
                    </ImageButton>
                    {imageName && (
                        <ImageFileName numberOfLines={1} ellipsizeMode="tail">
                            {imageName}
                        </ImageFileName>
                    )}
                </ImageWrapper>
                <ContentInput 
                    placeholder='이야기를 자유롭게 나눠보세요!'
                    placeholderTextColor="#B3B3B3"
                    multiline={true}
                    value={content}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setContent}
                    returnKeyType="done"
                    ref={contentRef}
                />
            </Wrapper>
        </Layout>
    )
}

const Layout = styled.View`
    background-color: #FFFFFF;
    flex: 1;
`

const Wrapper = styled.View`
    padding: 0 15px;
`

const TitleInput = styled(TextInput)`
    width: 100%;
    background-color: ${Colors.back};
    height: 52px;
    border-radius: 15px;
    margin-top: 25px;
    padding: 0 15px;
    font-family: 'medium';
    font-size: 17px;
    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 1);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 4;
`

const ImageWrapper = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    max-width: 100%;
`

const ImageButton = styled(TouchableOpacity)`
    width: 100px;
    height: 34px;
    border-radius: 100px;
    background-color: #F4F4F4;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 6px;
    margin: 13px 0;
`

const ImageButtonText = styled.Text`
    color: #7A7A7A;
    font-size: 13px;
    font-family: 'medium';
`

const ImageFileName = styled.Text`
    color: #7A7A7A;
    font-size: 13px;
    font-family: 'regular';
    flex: 1;
`

const ContentInput = styled(TextInput)`
    border: 1px solid #E6E6E6;
    width: 100%;
    height: 400px;
    border-radius: 15px;
    font-size: 15px;
    font-family: 'regular';
    line-height: 18px;
    padding: 18px 10px;
    text-align-vertical: top;
`

export default CommunityCreate
