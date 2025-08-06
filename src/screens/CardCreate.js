import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';
import { CustomHeader, PinkButton } from './../components';
import { Colors } from '../theme';
import Hospital from '../../assets/images/home/hospital.png';

const CardCreate = () => {
    const [content, setContent] = useState('');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (content!=='') {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    })

    return (
        <Layout>
            <CustomHeader type="text" text="회화 카드" />
            <Icon source={Hospital}/>
            <TextWrapper>
                <Title>병원 접수</Title>
                <Foreign>Hospital Registration</Foreign>
            </TextWrapper>
            <Background>
                <InputWrapper
                    value={content}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setContent}
                    returnKeyType="done"
                />
                <PinkButton 
                    text="추가하기"
                    disabled={!isReady}
                />
            </Background>
        </Layout>
    )
}

const Layout = styled.View`
    background-color: #FFFFFF;
    flex: 1;
    display: flex;
    align-items: center;
`

const Icon = styled(Image)`
    width: 120px;
    height: 120px;
    margin-top: 50px;
`

const TextWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 27px;
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

const Background = styled.View`
    width: 100%;
    flex: 1;
    background-color: ${Colors.back};
    padding: 22px 15px 0 15px;
`

const InputWrapper = styled(TextInput)`
    border-radius: 10px;
    width: 100%;
    height: 230px;
    background-color: #FFFFFF;
    padding: 20px;
    font-size: 17px;
    font-family: 'semiBold';
    line-height: 22px;
    margin-bottom: 20px;
    text-align-vertical: top;
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

export default CardCreate
