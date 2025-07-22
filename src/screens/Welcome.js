import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import styled from 'styled-components';
import  { Colors } from '../theme.js';
import background from '../../assets/images/main/background.png';
import logoBright from '../../assets/images/main/logo-bright.png';
import { WhiteButton, PinkButton } from '../components';

const Welcome = ({ navigation }) => {
    return (
        <Wrapper source={background}>
            <Logo source={logoBright} />
            <Desc>결혼 이주 여성들을 위한</Desc>
            <Desc>케어 서비스</Desc>
            <ButtonWrapper>
                <WhiteButton 
                    text="로그인" 
                    width={276} 
                    onPress={() => navigation.navigate('Login')} 
                    shadow={true}
                />
                <PinkButton 
                    text="회원가입" 
                    width={276} 
                    onPress={() => navigation.navigate('Signup1')} 
                    shadow={true}
                />
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled(ImageBackground)`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const Logo = styled(Image)`
    width: 170.73px;
    height: 92.66;
    margin-bottom: 37px;
`

const Desc = styled.Text`
    font-size: 20px;
    font-family: 'semiBold';
    color: ${Colors.white};
    line-height: 24px;
`

const ButtonWrapper = styled.View`
    width: 276.42px;
    height: 115.1px;
    margin-top: 30px;
    gap: 15px;
`

export default Welcome
