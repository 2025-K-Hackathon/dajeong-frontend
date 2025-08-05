import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { TabHeader } from './../components';

const CardList = () => {
    return (
        <Layout>
            <TabHeader />
            <Text>회화 카드 리스트</Text>
        </Layout>
    )
}

const Layout = styled.View`
    background-color: #FFFFFF;
    flex: 1;
`

export default CardList
