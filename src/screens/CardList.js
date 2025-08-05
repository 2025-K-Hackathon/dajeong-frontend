import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { TabHeader } from './../components';
import { Card } from '../constant/cardData';

const CardList = ({ navigation }) => {
    return (
        <Layout>
            <TabHeader />
            <FlatList
                data={Card}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index  }) => (
                    <CardWrapper onPress={() => navigation.navigate('CardDetail')}>
                        <ImageWrapper>
                            <Icon source={item.iconUrl} />
                        </ImageWrapper>
                        <TextWrapper>
                            <Title>{item.displayName}</Title>
                            <English>{item.english}</English>
                        </TextWrapper>
                    </CardWrapper>
                    
                )}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingBottom: 20,
                }}
            />
        </Layout>
    )
}

const Layout = styled.View`
    background-color: #FFFFFF;
    flex: 1;
`

const CardWrapper = styled(TouchableOpacity)`
    width: 100%;
    height: 150px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    flex-direction: row;
    margin-top: 20px;
    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 1);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadowRadius: 5.22px;
    elevation: 2;
`

const ImageWrapper = styled.View`
    width: 120px;
    height: 120px;
    background-color: #F4F4F4;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
`

const Icon = styled(Image)`
    width: 80px;
    height: 80px;
`

const TextWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
`

const Title = styled.Text`
    font-size: 20px;
    line-height: 28px;
    font-family: 'bold';
`

const English = styled.Text`
    font-size: 15px;
    line-height: 22px;
    font-family: 'regular';
    color: #7F7F7F;
`

export default CardList
