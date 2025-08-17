import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Linking }  from 'react-native';
import styled from 'styled-components';
import { Colors } from './../theme';
import MiniBright from '../../assets/images/main/mini-bright.png';
import Banner from '../../assets/images/main/banner.png';
import Arrow from '../../assets/images/home/arrow.png';
import Next from '../../assets/images/home/next.png';
import CardNews1 from '../../assets/images/home/card-news1.png';
import CardNews2 from '../../assets/images/home/card-news2.png';
import { Conversation } from './../constant/conversationData';
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import axiosInstance from '../utils/axiosInstance';

const Home = ({ navigation }) => {
    const statusBarHeight = getStatusBarHeight();
    const [name, setName] = useState('');
    const [previewType, setPreviewType] = useState('policy'); // policy와 news 둘 중 하나
    const [policy, setPolicy] = useState();

    const handleName = async () => {
        try {
            const response = await axiosInstance.get('/api/users/me');
            console.log('이름', response.data.name);
            setName(response.data.name);
        } catch(error) {
            console.log('이름 가져오기 실패', error.response);
        }
    }

    const handlePolicy = async () => {
        try {
            const response = await axiosInstance.get('/api/policy/recommendations/latest');
            console.log('추천 정책', response);
            setPolicy(response.data.source_documents);
        } catch(error) {
            console.log('추천 정책 가져오기 실패', error.response);
        }
    }

    useEffect(() => {
        handleName();
        handlePolicy();
    }, [])
    
    return (
        <Wrapper>
            <View>
                <Logo source={MiniBright} top={statusBarHeight+10}/>
                <BannerImage source={Banner}/>
                <TextWrapper>
                    <Title>안녕하세요, {name} 님</Title>
                    <Welcome>오늘은 어떤 하루였나요?</Welcome>
                    <ButtonWrapper onPress={() => navigation.navigate("AiDiary")}>
                        <ButtonText>일기 쓰러 가기</ButtonText>
                        <Image source={Arrow}/>
                    </ButtonWrapper>
                </TextWrapper>
            </View>
            <PreviewWrapper>
                <PreviewTop>
                    <PreviewButtonWrapper>
                        <PreviewButton onPress={() => setPreviewType("policy")} selected={previewType==="policy"}>
                            <PreviewButtonText selected={previewType==="policy"}>추천 정책</PreviewButtonText>
                        </PreviewButton>
                        <PreviewButton onPress={() => setPreviewType("news")} selected={previewType==="news"}>
                            <PreviewButtonText selected={previewType==="news"}>일상 카드 뉴스</PreviewButtonText>
                        </PreviewButton>
                    </PreviewButtonWrapper>
                    <TouchableOpacity onPress={() => navigation.navigate("LivingInfoStack")}>
                        <Image source={Next}/>
                    </TouchableOpacity>
                </PreviewTop>
                {previewType==="policy" ? (
                    <PreviewContentWrapper>
                        {policy && (
                            <PolicyWrapper>
                                {policy.slice(0, 3).map((item, index) => (
                                    <Policy key={index} onPress={() => Linking.openURL(item.url)}>
                                        <PolicyTitle numberOfLines={1} ellipsizeMode="tail">{item.title}</PolicyTitle>
                                        <PolicyDate>{item.date.split('-').join('.')}</PolicyDate>
                                    </Policy>
                                ))}
                            </PolicyWrapper>
                        )}
                    </PreviewContentWrapper>
                ) : (
                    <PreviewContentWrapper>
                        <CardNewsWrapper>
                            <Image source={CardNews1}/>
                            <Image source={CardNews2}/>
                        </CardNewsWrapper>
                        <MoreWrapper>
                            <MoreText>+6</MoreText>
                        </MoreWrapper>
                    </PreviewContentWrapper>
                )}
            </PreviewWrapper>
            <ConversationWrapper>
                <ConversationTitle>회화 카드</ConversationTitle>
                <FlatList
                    data={Conversation}
                    renderItem={({item, index}) => (
                        <ConversationCard 
                            key={index} 
                            onPress={
                                () => navigation.navigate('CardDetail', 
                                {image: item.iconUrl, type: item.type, displayName: item.displayName, english: item.english, page: 'home' })}
                        >
                            <ImageBackground>
                                <CardImage source={{uri: item.iconUrl}}/>
                            </ImageBackground>
                            <CardTextWrapper>
                                <CardText>{item.displayName}</CardText>
                            </CardTextWrapper>
                        </ConversationCard>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    contentContainerStyle={{gap: 10, marginLeft: 15}}
                />
            </ConversationWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    background-color: #FFFFFF;
`

const BannerImage = styled(Image)`
    width: 100%;
    height: 260px;
`

const Logo = styled(Image)`
    position: absolute;
    top: ${(props) => props.top};
    width: 33px;
    height: 33px;
    z-index: 1;
    left: 15px;
`

const TextWrapper = styled.View`
    position: absolute;
    top: 70px;
    right: 30px;
    display: flex;
    align-items: flex-end;
`

const Title = styled.Text`
    line-height: 22px;
    font-size: 20px;
    font-family: 'medium';
    color: ${Colors.white};
    margin-bottom: 3px;
`

const Welcome = styled.Text`
    line-height: 22px;
    font-size: 18px;
    font-family: 'regular';
    color: ${Colors.white};
    margin-bottom: 17px;
`

const ButtonWrapper = styled(TouchableOpacity)`
    background-color: ${Colors.white};
    border-radius: 100px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 3px;
    height: 32px;
    width: 154px;
`

const ButtonText = styled.Text`
    font-size: 20px;
    font-family: 'bold';
    color: ${Colors.main};
`

const PreviewWrapper = styled.View`
    border: 1px solid #B2B2B3;
    border-radius: 10px;
    margin: 13px 15px 19px 15px;
    padding: 10px;
    height: 225px;
`

const PreviewTop = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

const PreviewButtonWrapper = styled.View`
    display: flex;
    flex-direction: row;
`

const PreviewButton = styled(TouchableOpacity)`
    border-color: ${({selected}) => selected ? '#000000' : '#B2B2B3'};
    border-bottom-width: 1px;
    padding: 0 5px;
`

const PreviewButtonText = styled.Text`
    color: ${({selected}) => selected ? '#000000' : '#B2B2B3'};
    font-size: 15px;
    font-family: 'medium';
    line-height: 22px;
    margin-bottom: 3px;
`

const PreviewContentWrapper = styled.View`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const PolicyWrapper = styled.View`
    display: flex;
    gap: 10px;
    margin-top: 8px;
`

const Policy = styled(TouchableOpacity)`

`

const PolicyTitle = styled.Text`
    font-size: 15px;
    font-family: 'regular';
    line-height: 22px;
    margin-bottom: 3px;
`

const PolicyDate = styled.Text`
    font-size: 13px;
    font-family: 'regular';
    line-height: 22px;
    color: #7F7F7F;
`

const CardNewsWrapper = styled.View`
    display: flex;
    gap: 6px;
    flex-direction: row;
    align-items: center;
`

const MoreWrapper = styled.View`
    background-color: #CBCBCC;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 19px;
    height: 19px;
    border-radius: 10px;
    margin-left: 10px;
`

const MoreText = styled.Text`
    font-family: 'semiBold';
    font-size: 10px;
    line-height: 15px;
    color: ${Colors.white};
`

const ConversationWrapper = styled.View`
    width: 100%;
    height: 200px;
    background-color: ${Colors.back};
`

const ConversationTitle = styled.Text`
    font-size: 15px;
    font-family: 'semiBold';
    margin: 10px 0 10px 15px;
`

const ConversationCard = styled(TouchableOpacity)`
    width: 95px;
    height: 146px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.white};
    border: 1px solid #DAD7DA;

    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 0.25);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 10px;
    elevation: 4;
`

const ImageBackground = styled.View`
    background-color: #EDEDED;
    width: 73px;
    height: 73px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CardImage = styled(Image)`
    width: 42px;
    height: 42px;
`

const CardTextWrapper = styled.View`
    height: 44px;
    display: flex;
    justify-content: center;
`

const CardText = styled.Text`
    font-size: 15px;
    font-family: 'regular';
    text-align: center;
    width: 60px;
`

export default Home
