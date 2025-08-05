import React from 'react';
import { View, FlatList, Image } from 'react-native';
import styled from 'styled-components';
import { CustomHeader } from '../components';
import { News } from '../constant/newsData';

const NewsDetail = () => {
    return (
        <View>
            <CustomHeader type="text" text="일상 카드뉴스"/>
            <Wrapper>
                <FlatList
                    data={News}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index  }) => (
                        <ImageWrapper source={{ uri: item }} />
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 33,
                        paddingBottom: 50,
                    }}
                />
            </Wrapper>
        </View>
    )
}

const Wrapper = styled.View`
    padding-bottom: 96px;
    margin-top: 10px;
    background-color: #FFFFFF;
`

const ImageWrapper = styled(Image)`
    width: 100%;
    aspect-ratio: 1;
    margin-bottom: 5px;
`

export default NewsDetail
