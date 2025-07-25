import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity  } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomHeader, PinkButton, Dropdown } from '../components';

const Signup2 = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [isReady, setIsReady] = useState(false);
    const [country, setCountry] = useState();
    const [age, setAge] = useState();
    const [region, setRegion] = useState();
    const [isMarried, setMassied] = useState();
    const [hasChildren, setHasChildren] = useState();
    
    const countries = [
        { name: '베트남', english: 'Vietnam' },
        { name: '중국', english: 'China' },
        { name: '필리핀', english: 'Philippines' },
        { name: '태국', english: 'Thailand' },
        { name: '인도네시아', english: 'Indonesia' },
    ];

    const ages = [
        { name: '20대' },
        { name: '30대' },
        { name: '40대' },
        { name: '50대' },
        { name: '60대' },
    ];

    const regions = [
        { name: '수도권' },
        { name: '충청도' },
        { name: '강원도' },
        { name: '경상도' },
        { name: '전라도' },
    ];

    const children = [
        { name: '있음' },
        { name: '없음' },
        { name: '답변 안함' },
    ];

    const OpenBottomSheet = () => {

    }

    return (
    <>
        <SafeAreaView>
            <CustomHeader/>
            <Wrapper>
                <CountryWrapper>
                    <Title>출신 국가</Title>
                    <Dropdown contents={countries} />
                </CountryWrapper>
                <RowWrapper>
                    <ColumnWrapper>
                        <Title>나이</Title>
                        <Dropdown contents={ages} />
                    </ColumnWrapper>
                    <ColumnWrapper>
                        <Title>지역</Title>
                        <Dropdown contents={regions} />
                    </ColumnWrapper>
                </RowWrapper>
                <Line />
                <Title>결혼 여부</Title>
                <RadioGroup>
                    <RadioOption onPress={() => setMassied(true)}>
                        <OuterCircle selected={isMarried === true}>
                            {isMarried === true && <InnerCircle />}
                        </OuterCircle>
                        <RadioLabel>
                            <RadioText>기혼</RadioText>
                            <RadioEngText>(married)</RadioEngText>
                        </RadioLabel>
                    </RadioOption>
                    <RadioOption onPress={() => setMassied(false)}>
                        <OuterCircle selected={isMarried === false}>
                            {isMarried === false && <InnerCircle />}
                        </OuterCircle>
                        <RadioLabel>
                            <RadioText>미혼</RadioText>
                            <RadioEngText>(Single)</RadioEngText>
                        </RadioLabel>
                    </RadioOption>
                </RadioGroup>
                <ChildrenWrapper>
                    <Title>자녀 유무</Title>
                    <Dropdown contents={children} />
                </ChildrenWrapper>
            </Wrapper>
        </SafeAreaView>
        <PinkButtonWrapper paddingBottom={insets.bottom + 57}>
            <PinkButton 
                text="다음" 
                onPress={OpenBottomSheet()} 
            />
        </PinkButtonWrapper>
    </>
    )
}

const Wrapper = styled.View`
    padding: 0 25px;
    margin-top: 51px;
`

const Title = styled.Text`
    height: 27px;
    font-size: 18px;
    font-family: 'semiBold';
    color: ${Colors.black};
    margin-bottom: 10px;
`

const CountryWrapper = styled.View`
    width: 209px;
    margin-bottom: 24px;
`

const ColumnWrapper = styled.View`
    flex: 1;
    margin-bottom: 42px;
    max-width: 50%;
`

const RowWrapper = styled.View`
    display: flex;
    flex-direction: row;
    gap: 20px;
    max-width: 100%;
`

const Line = styled.View`
    background-color: #E6E6E6;
    height: 1px;
    width: 100%;
    margin-bottom: 11px;
`

const ChildrenWrapper = styled.View`
    padding-right: 10px;
    width: 50%;
`

const RadioGroup = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    gap: 30px;
`

const RadioOption = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
`

const OuterCircle = styled.View`
    width: 16px;
    height: 16px;
    border-radius: 8px;
    border: 0.5px solid #B3B3B3;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`

const InnerCircle = styled.View`
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: ${Colors.main};
`

const RadioLabel = styled.View`
    flex-direction: row;
    align-items: baseline;
`

const RadioText = styled.Text`
    font-size: 18px;
    font-family: 'semiBold';
    color: ${Colors.black};
`

const RadioEngText = styled.Text`
    font-size: 18px;
    color: #7F7F7F;
    margin-left: 5px;
    font-family: 'medium';
`

const PinkButtonWrapper = styled.View`
    position: absolute;
    width: 100%;
    margin: 0 auto;
    bottom: 10px;
    padding: 0 25px ${({ paddingBottom }) => `${paddingBottom}px`};
`

export default Signup2
