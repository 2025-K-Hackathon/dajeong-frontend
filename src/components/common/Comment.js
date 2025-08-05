import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

const Comment = ({region, nationality, time, content}) => {
    return (
        <Wrapper>
            <UserWrapper>
                <UserText>{region}</UserText>
                <Line />
                <UserText>{nationality}</UserText>
                <Line />
                <UserText>{time}</UserText>
            </UserWrapper>
            <ContentWrapper>{content}</ContentWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    width: 100%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
`

const UserWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 5px;
`

const UserText = styled.Text`
    color: #7F7F7F;
    font-size: 13px;
    line-height: 22px;
`

const Line = styled.View`
    height: 15px;
    width: 1px;
    background-color: #BFBFBF;
    margin: 0 5px;
`

const ContentWrapper = styled.Text`
    font-size: 15px;
    font-family: 'regular';
    line-height: 22px;
    padding-bottom: 10px;
    border-color: #E6E6E6;
    border-bottom-width: 1px;
    color: #000000;
`

export default Comment
