import React from 'react';
import { View, Button, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from './../../theme';
import LogoDark from '../../../assets/images/main/logo-dark.png';

const Modal = ({ text, buttonText, onPress }) => {
    return (
        <Wrapper style={{ transform: [{ translateX: -145 }, { translateY: -120 }] }}>
            <Logo source={LogoDark}/>
            <Desc>{text}</Desc>
            <ButtonWrapper onPress={onPress}>
                <ButtonText>{buttonText}</ButtonText>
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    width: 340px;
    height: 230px;
    border-radius: 15px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 34px 26px;
    position: absolute;
    top: 50%;
    left: 50%;
`

const Logo = styled(Image)`
    width: 82px;
    height: 42px;
`

const Desc = styled.Text`
    font-family: 'semiBold';
    font-size: 18px;
    line-height: 27px;
    color: #000000;
    text-align: center;
`

const ButtonWrapper = styled(TouchableOpacity)`
    background-color: ${Colors.main};
    border-radius: 15px;
    width: 234px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ButtonText = styled.Text`
    color: #FFFFFF;
    font-family: 'bold';
    font-size: 20px;
`

export default Modal
