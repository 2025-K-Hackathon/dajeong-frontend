import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components';
import { TabHeader } from './../components';
import { Policy } from '../constant/policyData';
import CardNews1 from '../../assets/images/livingInfo/family1.png';
import CardNews2 from '../../assets/images/livingInfo/education1.png';
import CardNews3 from '../../assets/images/livingInfo/food1.png';

const Recommend = ({ navigation }) => {
    return (
        <Layout>
            <TabHeader />
            <ScrollWrapper>
                <Wrapper>
                    <PolicySectionTitle>추천 정책</PolicySectionTitle>
                    <PreviewContentWrapper>
                            {Policy.map((policy, index) => (
                                <PolicyWrapper key={index}>
                                    <PolicyTitle>{policy.title}</PolicyTitle>
                                    <PolicyDate>{policy.date}</PolicyDate>
                                </PolicyWrapper>
                            ))}
                    </PreviewContentWrapper>
                </Wrapper>
                <DividingLine />
                <Wrapper>
                    <CardSectionTitle>일상 카드뉴스</CardSectionTitle>
                </Wrapper>
                <CardListWraper
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <CardRow>
                        <CardWrapper onPress={() => navigation.navigate('NewsDetail')}>
                            <CardImage source={CardNews1} resizeMode="cover"/>
                        </CardWrapper>
                        <CardWrapper onPress={() => navigation.navigate('NewsDetail')}>
                            <CardImage source={CardNews2} resizeMode="cover"/>
                        </CardWrapper>
                        <CardWrapper onPress={() => navigation.navigate('NewsDetail')}>
                            <CardImage source={CardNews3} resizeMode="cover"/>
                        </CardWrapper>
                    </CardRow>
                </CardListWraper>
            </ScrollWrapper>
            
        </Layout>
    )
}

const Layout = styled.View`
    background-color: #FFFFFF;
    flex: 1;
`

const ScrollWrapper = styled(ScrollView)`
    flex: 1;
`

const Wrapper = styled.View`
    padding: 0 15px;
`

const PolicySectionTitle = styled.Text`
    font-family: 'semiBold';
    font-size: 15px;
    line-height: 22px;
    margin-top: 20px;
`

const PreviewContentWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-direction: column;
    margin-top: 14px;
    padding: 0 10px;
`

const PolicyWrapper = styled(TouchableOpacity)`
    display: flex;
    width: 100%;
    border-color: #E6E6E6;
    border-top-width: 1;
    padding-top: 7px;
`

const PolicyTitle = styled.Text`
    font-size: 15px;
    font-family: 'regular';
    line-height: 22px;
    margin-bottom: 3px;
`

const PolicyDate = styled.Text`
    font-size: 13px;
    font-family: 'regular';
    line-height: 22px;
    color: #7F7F7F;
    margin-bottom: 3px;
`

const DividingLine = styled.View`
    background-color: #E6E6E6;
    height: 5px;
    width: 100%;
    margin: 10px 0 7px 0;
`

const CardSectionTitle = styled.Text`
    font-family: 'semiBold';
    font-size: 15px;
    line-height: 22px;
`

const CardListWraper = styled.ScrollView`
    margin: 10px 10px 0 10px;
    display: flex;
    gap: 10px;
`

const CardRow = styled.View`
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-bottom: 10px;
`

const CardWrapper = styled(TouchableOpacity)`
    border-radius: 15px;
    width: 185px;
    height: 185px;
    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 1);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 15px;
    elevation: 4;
`

const CardImage = styled(Image)`
    width: 100%;
    height: 100%;
    border-radius: 15px;
`

export default Recommend
