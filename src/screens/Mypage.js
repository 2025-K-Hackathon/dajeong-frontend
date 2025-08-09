import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'styled-components';
import { CustomMiniHeader } from '../components';
import { UserData } from './../constant/userData';
import { Colors } from './../theme';
import axiosInstance from './../utils/axiosInstance';

const Mypage = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState();
    const [nationality, setNationality] = useState();
    const [age, setAge] = useState();
    const [region, setRegion] = useState();
    const [isMarried, setIsMarried] = useState();
    const [hasChildren, setHasChildren] = useState();
    
    const countries = [
        { name: '베트남', english: 'Vietnam', value: 'VIETNAM' },
        { name: '중국', english: 'China', value: 'CHINA' },
        { name: '필리핀', english: 'Philippines', value: 'PHILIPPINES' },
        { name: '태국', english: 'Thailand', value: 'THAILAND' },
        { name: '인도네시아', english: 'Indonesia', value: 'INDONESIA' },
        { name: '기타', value: 'ETC' },
        { name: '비공개', value: 'PRIVATE' },
    ];

    const regions = [
        { name: '수도권', value: 'CAPITAL' },
        { name: '충청도', value: 'CHUNGCHEONG' },
        { name: '강원도', value: 'GANGWON' },
        { name: '경상도', value: 'GYEONGSANG' },
        { name: '전라도', value: 'JEOLLA' },
        { name: '제주도', value: 'JEJU' },
        { name: '비공개', value: 'PRIVATE' },
    ];

    const children = [
        { name: 'o', value: 'YES' },
        { name: 'x', value: 'NO' },
        { name: '답변 안함', value: 'PRIVATE' },
    ];

    const getName = (data, array) => {
        const value = array.find(item => item.value === data);
        return value ? value.name : value;
    }

    const handleInformation = async () => {
        try {
            const response = await axiosInstance.get('/api/users/me');
            console.log('내 정보 조회', response.data);
            setName(response.data.name);
            setId(response.data.username);
            setNationality(getName(response.data.nationality, countries));
            setAge(Math.floor((2025 - response.data.age) / 10));
            setRegion(getName(response.data.region, regions));
            setIsMarried(response.data.married);
            setHasChildren(getName(response.data.hasChildren, children));
        } catch(error) {
            console.log('내 정보 조회 실패', error.response);
        }
    }

    useEffect(() => {
        handleInformation();
    }, [])

    return (
        <Background>
            <Wrapper>
                <CustomMiniHeader text="마이페이지" marginBottom={39} />
                <Title>{name}</Title>
                <CategoryWrapper>
                    <IdCategory>아이디</IdCategory>
                    <Id>{id}</Id>
                </CategoryWrapper>
            </Wrapper>
            <Line />
            <InfoWrapper>
                <Title>회원 정보</Title>
                <CategoryWrapper>
                    <Category>출신 국가</Category>
                    <Value>{nationality}</Value>
                </CategoryWrapper>
                <CategoryWrapper>
                    <Category>연령대</Category>
                    <Value>{age}0대</Value>
                </CategoryWrapper>
                <CategoryWrapper>
                    <Category>지역</Category>
                    <Value>{region}</Value>
                </CategoryWrapper>
                <CategoryWrapper>
                    <Category>결혼 여부</Category>
                    <Value>{isMarried ? '기혼'  : '미혼'}</Value>
                </CategoryWrapper>
                <CategoryWrapper>
                    <Category>자녀 유무</Category>
                    <Value>{hasChildren}</Value>
                </CategoryWrapper>
            </InfoWrapper>
            <Line />
        </Background>
    )
}

const Background = styled.View`
    background-color: #FFFFFF;
    flex: 1;
`

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
    height: 2px;
    background-color: #E6E6E6;
    margin: 0 15px;
`

const InfoWrapper = styled.View`
    background-color: ${Colors.back};
    padding: 15px;
`

export default Mypage
