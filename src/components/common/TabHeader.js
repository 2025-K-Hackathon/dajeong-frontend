import React, { useState } from 'react';
import styled from 'styled-components';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Colors } from './../../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const TabHeader = () => {
    const statusBarHeight = getStatusBarHeight();
    const navigation = useNavigation();
    const route = useRoute();
    const selectedPage = route.name;
    
    return (
        <Wrapper marginTop={statusBarHeight+20}>
            <PageWrapper selected={selectedPage==='Recommend'}>
                <TouchableOpacity onPress={() => navigation.navigate('Recommend')}>
                    <PageName selected={selectedPage==='Recommend'}>추천 콘텐츠</PageName>
                </TouchableOpacity>
            </PageWrapper>
            <PageWrapper selected={selectedPage==='CardList'}>
                <TouchableOpacity onPress={() => navigation.navigate('CardList')}>
                    <PageName selected={selectedPage==='CardList'}>회화 카드</PageName>
                </TouchableOpacity>
            </PageWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    margin: ${(props) => props.marginTop}px 15px 0px 15px;
    display: flex;
    flex-direction: row;
`

const PageWrapper = styled.View`
    width: 50%;
    border-bottom-color: ${(props) => props.selected ? '#FF7E94' : '#E6E6E6'};
    border-bottom-width: 2;
`

const PageName = styled.Text`
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    font-family: ${(props) => props.selected ? 'bold' : 'medium'};
    color: ${(props) => props.selected ? '#000000' : '#B3B3B3'};
    margin-bottom: 7px;
`

export default TabHeader
