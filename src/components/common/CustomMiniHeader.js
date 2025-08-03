import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import MiniDark from '../../../assets/images/main/mini-dark.png';
import { getStatusBarHeight } from "react-native-status-bar-height"; 

const CustomMiniHeader = ({ text, marginBottom }) => {
    const statusBarHeight = getStatusBarHeight();

    return (
        <Wrapper marginBottom={marginBottom} paddingTop={statusBarHeight+7}>
            <Logo source={MiniDark} />
            <Title>{text}</Title>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    width: 100%;
    padding-top: ${(props) => props.paddingTop};
    display: flex;
    flex-direction: row;
    gap: 9px;
    align-items: flex-end;
    margin-bottom: ${(props) => props.marginBottom}px;
`

const Logo = styled(Image)`
    width: 33px;
    height: 33px;
`

const Title = styled.Text`
    font-family: 'semiBold';
    font-size: 17px;
`

export default CustomMiniHeader
