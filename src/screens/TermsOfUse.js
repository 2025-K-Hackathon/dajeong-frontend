import React from 'react';
import styled from 'styled-components';
import { Colors } from '../theme';
import { View, Text } from 'react-native';
import { CustomHeader } from '../components';

const TermsOfUse = ({ route }) => {
    const title = route.params.title;
    const data = route.params.data;
;
    return (
        <>
            <CustomHeader />
            <Wrapper>
                <Title>{title}</Title>
                    {data.map((item, index) => (
                        <DataWrapper>
                            <MiniTitle key={index}>{item.id}. {item.title}</MiniTitle>
                            <View>
                                {item.contents.map((content, index) => (
                                    <ContentWrapper key={index}>
                                        <Left>· </Left>
                                        <Content>{content}</Content>
                                    </ContentWrapper>
                                ))}
                            </View>
                        </DataWrapper>
                    ))}
            </Wrapper>
        </>
    )
}

const Wrapper = styled.View`
    margin-top: 22px;
    padding: 0 15px;
`

const Title = styled.Text`
    font-size: 15px;
    font-family: 'semiBold';
    color: ${Colors.black};
    margin-bottom: 15px;
`

const DataWrapper = styled.View`
    padding: 0 15px;
    line-height: 20px;
    margin-bottom: 20px;
`

const MiniTitle = styled.Text`
    font-size: 13px;
    height: 20px;
`

const ContentWrapper = styled.View`
    display: flex;
    flex-direction: row;
`

const Left = styled.Text`
    font-size: 15px;
    font-family: 'extraBold';
    justify-content: center;
    padding-left: 5px;
`

const Content = styled.Text`
    font-family: 'regular';
    width: 100%;
    flex-wrap: wrap;
    word-break: keep-all;
    line-height: 20px;
`

export default TermsOfUse
