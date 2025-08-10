import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../theme';
import Background from '../../assets/images/main/background.png';
import Back from '../../assets/images/common/back.png';
import logoBright from '../../assets/images/main/logo-bright.png';
import { PinkButton } from '../components';
import { getStatusBarHeight } from "react-native-status-bar-height";
import axiosInstance from './../utils/axiosInstance';
import { AuthContext } from '../contexts/AuthContext';

const Login = ({ navigation }) => {
    const { setIsLogin } = useContext(AuthContext);
    const statusBarHeight = getStatusBarHeight();
    const [isReady, setIsReady] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const passwordRef = useRef(null);

    const handleId = (id) => {
        setId(id);
    }

    const handlePassword = (password) => {
        setPassword(password);
    }

    const handleLogin = async () => {
        try {
            const response =  await axiosInstance.post('/api/users/login', {
                username: id,
                password
            });
            console.log('로그인 성공', response);
            setIsLogin(true);
        } catch(error) {
            console.log('로그인 실패', error.response);
            Alert.alert('아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해 주세요.');
        }
    }

    useEffect(() => {
        if (id!=='' && password!=='') {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    })

    return (
        <Wrapper source={Background}>
            <Header marginTop={statusBarHeight+26}>
                <BackWrapper onPress={() => navigation.goBack()}>
                    <Image source={Back} />
                </BackWrapper>
                <LogoWrapper>
                    <Logo source={logoBright} />
                    <Desc>결혼 이주 여성들을 위한</Desc>
                    <Desc>케어 서비스</Desc>
                </LogoWrapper>
            </Header>
            <InputWrapper>
                <View>
                    <Title>아이디</Title>
                    <StyledInput 
                        value={id}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onChangeText={handleId}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                </View>
                <View>
                    <Title>비밀번호</Title>
                    <StyledInput 
                        value={password}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                        onChangeText={handlePassword}
                        ref={passwordRef}
                    />
                </View>
            </InputWrapper>
            <PinkButton 
                text="로그인"
                height={52}
                disabled={!isReady}
                shadow={true}
                border={true}
                onPress={handleLogin}
            />
        </Wrapper>
    )
}

const Wrapper = styled(ImageBackground)`
    flex: 1;
    padding: 0 25px;
`

const Header = styled.View`
    width: 100%;
    margin-top: ${(props) => props.marginTop};
`

const BackWrapper = styled.TouchableOpacity`
    position: absolute;
    left: -14px;
`

const LogoWrapper = styled.View`
    display: flex;
    align-items: center;
    margin-bottom: 50px;
`

const Logo = styled(Image)`
    width: 170.73px;
    height: 92.66px;
    margin-bottom: 37px;
`

const Desc = styled.Text`
    font-size: 20px;
    font-family: 'semiBold';
    color: ${Colors.white};
    line-height: 24px;
`

const InputWrapper = styled.View`
    display: flex;
    gap: 9px;
    margin-bottom: 29px;
`

const Title = styled.Text`
    height: 27px;
    font-size: 18px;
    font-family: 'semiBold';
    color: ${Colors.white};
`

const StyledInput = styled(TextInput)`
    border-radius: 15px;
    border: 1px solid rgba(255, 126, 148, 0.5);
    background-color: ${Colors.white};
    width: 100%;
    height: 50.33px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    font-family: 'semiBold';
    font-size: 16px;
    /* 그림자 */
    shadow-color: rgba(255, 126, 148, 0.2);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 4;
`

export default Login
