import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { CustomHeader } from './../components';
import Plus from '../../assets/images/livingInfo/plus.png';
import Sound from '../../assets/images/livingInfo/sound.png';
import { Audio } from 'expo-av';
import axiosInstance from './../utils/axiosInstance';

const CardDetail = ({ navigation, route }) => {
    const { type, image, displayName, english, page } = route.params;

    const [conversations, setConversations] = useState();

    const handleConversation = async () => {
        try {
            const response = await axiosInstance.get(`/api/conversations/${type}`);
            console.log('회화 문장', response.data);
            setConversations(response.data);
        } catch(error) {
            if (error.status===404) {
                console.log('회화 문장이 존재하지 않습니다.');
            } else {
                console.log('회화 문장 가져오기 실패', error.response);
            }
        }
    }

    const handleTts = async (url) => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: url },
                { shouldPlay: true }
            );
        } catch (error) {
            console.log('tts 재생 실패', error);
        }
    }

    useEffect(() => {
        handleConversation();
    }, [])

    return (
        <Layout>
            <CustomHeader type="text" text="회화 카드" onBackPress={() => navigation.navigate(page==='home' ? 'Home' : 'CardList')}/>
            <ScrollView
                keyboardShouldPersistTaps="handled"
            >
                <Wrapper>
                    <CardWrapper>
                        <Icon source={{uri: image}} />
                        <TextWrapper>
                            <Title>{displayName}</Title>
                            <Foreign>{english}</Foreign>
                        </TextWrapper>
                        {conversations && conversations.map((conversation, index) => (
                            <ConversationWrapper
                                key={index}
                                last={index === conversation.length - 1}
                            >
                                <ConversationTextWrapper>
                                    <Korean>{conversation.translatedText}</Korean>
                                    <Foreign>{conversation.inputText}</Foreign>
                                </ConversationTextWrapper>
                                <SoundWrapper onPress={() => handleTts(conversation.ttsUrl)}>
                                    <Image source={Sound}/>
                                </SoundWrapper>
                            </ConversationWrapper>
                        ))}
                    </CardWrapper>
                    <PlusWrapper onPress={() => navigation.navigate('CardCreate', { type, image, displayName, english, page })}>
                        <Image source={Plus} />
                    </PlusWrapper>
                </Wrapper>
            </ScrollView>
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

const CardWrapper = styled.View`
    border: 1px solid rgba(255, 126, 148, 0.5);
    width: 100%;
    border-radius: 15px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    padding: 20px 10px 18px 10px;
    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 1);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadowRadius: 4px;
    elevation: 2;
`

const Icon = styled(Image)`
    width: 120px;
    height: 120px;
`

const TextWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 5px 5px 5px;
    border-color: #E6E6E6;
    border-bottom-width: 1;
    margin-bottom: 20px;
`

const Title = styled.Text`
    font-size: 20px;
    line-height: 28px;
    font-family: 'bold';
    margin-top: 8px;
`

const Foreign = styled.Text`
    font-size: 15px;
    line-height: 22px;
    font-family: 'regular';
    color: #7F7F7F;
`

const ConversationWrapper = styled.View`
    padding-bottom: 5px;
    width: 100%;
    border-color: #E6E6E6;
    border-bottom-width: ${({last}) => last ? '0px' : '1px'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

const ConversationTextWrapper = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Korean = styled.Text`
    font-size: 17px;
    font-family: 'bold';
    line-height: 22px;
    margin-bottom: 3px;
    margin-top: 10px;
`

const SoundWrapper = styled(TouchableOpacity)`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #8B8B8B;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    margin-left: 10px;
    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 1);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadowRadius: 4px;
    elevation: 2;
`

const PlusWrapper = styled(TouchableOpacity)`
    background-color: #E5E5E5;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 18px auto 10px auto;
`

export default CardDetail
