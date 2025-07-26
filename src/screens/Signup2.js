import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomHeader, PinkButton, Dropdown, CustomBottomSheet } from '../components';
import { Service, PersonalInformation, Marketing } from '../constant/termsOfUseData';
import Next from '../../assets/images/signup/next.png';

const Signup2 = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [isReady, setIsReady] = useState(false);
    const [country, setCountry] = useState();
    const [age, setAge] = useState();
    const [region, setRegion] = useState();
    const [isMarried, setMassied] = useState();
    const [hasChildren, setHasChildren] = useState();

    // 바텀시트
    const [isOpen, setIsOpen] = useState(false);
    const bottomSheetRef = useRef(null);
    const [all, setAll] = useState(false);
    const [essential1, setEssential1] = useState(false);
    const [essential2, setEssential2] = useState(false);
    const [unessential, setUnessential] = useState(false);

    const handleAll = () => {
        if (all) {
            setAll(false);
            setEssential1(false);
            setEssential2(false);
            setUnessential(false);
        } else {
            setAll(true);
            setEssential1(true);
            setEssential2(true);
            setUnessential(true);
        }
    }

    const handleEssential1 = () => {
        if (essential1) { // 원래 클릭o
            setEssential1(false);
            setAll(false);
        } else { // 원래 클릭x
            setEssential1(true);
            if (essential2 && unessential) {
                setAll(true);
            }
        }
    }

    const handleEssential2 = () => {
        if (essential2) {
            setEssential2(false);
            setAll(false);
        } else {
            setEssential2(true);
            if (essential1 && unessential) {
                setAll(true);
            }
        }
    }

    const handleUnessential = () => {
        if (unessential) {
            setUnessential(false);
            setAll(false);
        } else {
            setUnessential(true);
            if (essential1 && essential2) {
                setAll(true);
            }
        }
    }
    
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
        setIsOpen(true);
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
        {!isOpen && (
            <PinkButtonWrapper paddingBottom={insets.bottom + 57}>
                <PinkButton 
                    text="다음" 
                    onPress={OpenBottomSheet} 
                />
            </PinkButtonWrapper>
        )}
        
        {/* 이용 약관 바텀 시트 */}
        {isOpen && (
            <CustomBottomSheet
                ref={bottomSheetRef}
                snapPoints={['70%']}
                isOpen={isOpen}
            >
                <BottomTitleWrapper>
                    <BottomTitle>서비스 이용 약관에</BottomTitle>
                    <BottomTitle>동의해 주세요.</BottomTitle>
                </BottomTitleWrapper>
                {/* 이용 약관 동의 */}
                <RadioOption onPress={handleAll}>
                    <OuterCircle selected={all === true}>
                        {all === true && <InnerCircle />}
                    </OuterCircle>
                    <RadioLabel>
                        <RadioText>네, 모두 동의합니다.</RadioText>
                    </RadioLabel>
                </RadioOption>
                <EssentialWrapper>
                    <RadioOption onPress={handleEssential1}>
                        <OuterCircle selected={essential1 === true}>
                            {essential1 === true && <InnerCircle />}
                        </OuterCircle>
                        <RadioLabel>
                            <RadioText>(필수) 서비스 이용약관에 동의</RadioText>
                        </RadioLabel>
                        <NextWrapper onPress={() => navigation.navigate("TermsOfUse", {title: "서비스 이용약관", data: Service})}>
                            <Image source={Next}/>
                        </NextWrapper>
                    </RadioOption>
                    <RadioOption onPress={handleEssential2}>
                        <OuterCircle selected={essential2 === true}>
                            {essential2 === true && <InnerCircle />}
                        </OuterCircle>
                        <RadioLabel>
                            <RadioText>(필수) 개인정보 수집 이용에 동의</RadioText>
                        </RadioLabel>
                        <NextWrapper onPress={() => navigation.navigate("TermsOfUse", {title: "개인정보 수집 이용", data: PersonalInformation})}>
                            <Image source={Next}/>
                        </NextWrapper>
                    </RadioOption>
                </EssentialWrapper>
                <RadioOption onPress={handleUnessential}>
                    <OuterCircle selected={unessential === true}>
                        {unessential === true && <InnerCircle />}
                    </OuterCircle>
                    <RadioLabel>
                        <RadioText>(선택) 마케팅 개인정보 제3자 제공 동의</RadioText>
                    </RadioLabel>
                        <NextWrapper onPress={() => navigation.navigate("TermsOfUse", {title: "마케팅 개인정보 제3자 제공", data: Marketing})}>
                            <Image source={Next}/>
                        </NextWrapper>
                </RadioOption>
                <PinkButtonBottomWrapper paddingBottom={insets.bottom + 57}>
                    <PinkButton 
                        text="확인" 
                        onPress={() => navigation.navigate("Welcome")}
                        disabled={!essential1 || !essential2} 
                    />
                </PinkButtonBottomWrapper>
            </CustomBottomSheet>
        )}
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

const BottomTitleWrapper = styled.View`
    margin-bottom: 30px;
`

const BottomTitle = styled.Text`
    font-size: 18px;
    font-family: 'bold';
    height: 27px;
`

const EssentialWrapper = styled.View`
    border-color: #E6E6E6;
    border-top-width: 1;
    border-bottom-width: 1;    
    padding: 15px 0;
    gap: 15px;
    margin: 11px 0 18px 0;
`

const NextWrapper = styled(TouchableOpacity)`
    position: absolute;
    right: 0;
    padding-left: 10px;
    height: 100%;
    display: flex;
    justify-content: center;
`

const PinkButtonBottomWrapper = styled.View`
    position: absolute;
    width: 100%;
    bottom: 10px;
    margin-left: 25px;
    padding-bottom: ${({ paddingBottom }) => `${paddingBottom}px`};
`

export default Signup2
