import React from 'react';
import { View, FlatList, Image } from 'react-native';
import styled from 'styled-components';
import { CustomHeader } from '../components';
import { News } from '../constant/newsData';

const NewsDetail = () => {
    return (
        <Layout>
            <CustomHeader type="text" text="일상 카드뉴스"/>
            <Wrapper>
                <FlatList
                    data={News}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <ImageWrapper key={index} source={item} resizeMode='contain'/>
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 25,
                        paddingBottom: 80,
                    }}
                />
            </Wrapper>
        </Layout>
    )
}

const Layout = styled.View`
    background-color: #FFFFFF;
    flex: 1;
`

const Wrapper = styled.View`
    margin-top: 10px;
`

const ImageWrapper = styled(Image)`
    width: 100%;
    margin-bottom: 5px;
`

export default NewsDetail
