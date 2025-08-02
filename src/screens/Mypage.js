import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'styled-components';
import { CustomMiniHeader } from '../components';
import { UserData } from './../constant/userData';
import { Colors } from './../theme';

const Mypage = () => {
    return (
        <View>
            <Wrapper>
                <CustomMiniHeader text="마이페이지" marginBottom={39} />
                <Title>{UserData.name}</Title>
                <CategoryWrapper>
                    <IdCategory>아이디</IdCategory>
                    <Id>{UserData.username}</Id>
                </CategoryWrapper>
            </Wrapper>
            <Line />
            <InfoWrapper>
                <Title>회원 정보</Title>
                <CategoryWrapper>
                    <Category>출신 국가</Category>
                    <Value>{UserData.nationality}</Value>
                </CategoryWrapper>
                <CategoryWrapper>
                    <Category>연령대</Category>
                    <Value>{UserData.age}</Value>
                </CategoryWrapper>
                <CategoryWrapper>
                    <Category>지역</Category>
                    <Value>{UserData.region}</Value>
                </CategoryWrapper>
                <CategoryWrapper>
                    <Category>결혼 여부</Category>
                    <Value>{UserData.married ? '기혼'  : '미혼'}</Value>
                </CategoryWrapper>
                <CategoryWrapper>
                    <Category>자녀 유무</Category>
                    <Value>{UserData.hasChildren ? 'o' : 'x'}</Value>
                </CategoryWrapper>
            </InfoWrapper>
            <Line />
        </View>
    )
}

const Wrapper = styled.View`
    padding: 0 15px;
`

const Title = styled.Text`
    font-size: 18px;
    font-family: 'semiBold';
    margin-bottom: 16px;
`

const CategoryWrapper = styled.View`
    width: 100%;
    padding: 0 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 15px;
`

const IdCategory = styled.Text`
    font-size: 15px;
    font-family: 'semiBold';
    color: #7F7F7F;
    height: 23px;
`

const Id = styled.Text`
    font-size: 15px;
    font-family: 'medium';
    height: 23px;
`
const Category = styled.Text`
    font-size: 15px;
    font-family: 'medium';
    color: #7F7F7F;
    height: 23px;
`

const Value = styled.Text`
    font-size: 15px;
    font-family: 'semiBold';
    height: 23px;
`

const Line = styled.View`
    width: 100%;
    height: 2px;
    background-color: #E6E6E6;
    margin: 0 15px;
`

const InfoWrapper = styled.View`
    background-color: ${Colors.back};
    padding: 15px;
`

export default Mypage
