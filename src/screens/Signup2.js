import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomHeader, PinkButton, Dropdown, CustomBottomSheet } from '../components';
import { Service, PersonalInformation, Marketing } from '../constant/termsOfUseData';
import Next from '../../assets/images/signup/next.png';
import { useRoute } from '@react-navigation/native';
import axiosInstance from '../utils/axiosInstance';

const Signup2 = ({ navigation }) => {
    const route = useRoute();
    const { name, id, password } = route.params;
    const insets = useSafeAreaInsets();
    const [isReady, setIsReady] = useState(false);
    const [country, setCountry] = useState(null);
    const [age, setAge] = useState(null);
    const [region, setRegion] = useState(null);
    const [isMarried, setMassied] = useState(null);
    const [hasChildren, setHasChildren] = useState(null);
    const [childAge, setChildAge] = useState(null);

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

    const handleSignup = async () => {
        try {
            const response = await axiosInstance.post('/api/users/signup', {
                username: name,
                password,
                name,
                nationality: country,
                age,
                region,
                married: isMarried,
                hasChildren,
                childAge
            })
            console.log('회원가입 성공', response);
            navigation.navigate('Welcome');
        } catch(error) {
            console.log('회원가입 실패', error);
        }
    }
    
    const countries = [
        { name: '베트남', english: 'Vietnam', value: 'VIETNAM' },
        { name: '중국', english: 'China', value: 'CHINA' },
        { name: '필리핀', english: 'Philippines', value: 'PHILIPPINES' },
        { name: '태국', english: 'Thailand', value: 'THAILAND' },
        { name: '인도네시아', english: 'Indonesia', value: 'INDONESIA' },
        { name: '기타', value: 'ETC' },
        { name: '비공개', value: 'PRIVATE' },
    ];


    const regions = [
        { name: '수도권', value: 'CAPITAL' },
        { name: '충청도', value: 'CHUNGCHEONG' },
        { name: '강원도', value: 'GANGWON' },
        { name: '경상도', value: 'GYEONGSANG' },
        { name: '전라도', value: 'JEOLLA' },
        { name: '제주도', value: 'JEJU' },
        { name: '비공개', value: 'PRIVATE' },
    ];


    const children = [
        { name: '있음', value: 'YES' },
        { name: '없음', value: 'NO' },
        { name: '답변 안함', value: 'PRIVATE' },
    ];


    const OpenBottomSheet = () => {
        setIsOpen(true);
    }

    useEffect(() => {
        console.log(country, age, region, isMarried, hasChildren, childAge);
        if (country && age && region && isMarried && hasChildren && childAge) {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    }, [country, age, region, isMarried, hasChildren, childAge])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Layout>
                <SafeAreaView>
                    <CustomHeader/>
                    <Wrapper>
                        <CountryWrapper>
                            <Title>출신 국가</Title>
                            <Dropdown 
                                contents={countries} 
                                onSelect={(selected) => setCountry(selected.value)}
                            />
                        </CountryWrapper>
                        <RowWrapper>
                            <ColumnWrapper>
                                <Title>나이</Title>
                                <StyledInput
                                    value={age}
                                    returnKeyType="next"
                                    onChangeText={(age)=>setAge(age)}
                                    keyboardType="number-pad"
                                    placeholder='예: 2025'
                                    placeholderTextColor='#B1ADAD'
                                />
                            </ColumnWrapper>
                            <ColumnWrapper>
                                <Title>지역</Title>
                            <Dropdown 
                                contents={regions} 
                                onSelect={(selected) => setRegion(selected.value)}
                            />
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
                        <RowWrapper>
                            <ColumnWrapper>
                                <Title>자녀 유무</Title>
                            <Dropdown 
                                contents={children} 
                                onSelect={(selected) => setHasChildren(selected.value)}
                            />
                            </ColumnWrapper>
                            <ColumnWrapper>
                                <Title>자녀 나이</Title>
                                <StyledInput
                                    value={childAge}
                                    returnKeyType="done"
                                    onChangeText={(age)=>setChildAge(age)}
                                    keyboardType="number-pad"
                                    placeholder='예: 2025'
                                    placeholderTextColor='#B1ADAD'
                                />
                            </ColumnWrapper>
                        </RowWrapper>
                    </Wrapper>
                </SafeAreaView>
                {!isOpen && (
                    <PinkButtonWrapper paddingBottom={insets.bottom + 57}>
                        <PinkButton 
                            text="다음" 
                            onPress={OpenBottomSheet} 
                            disabled={!isReady}
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
                                onPress={handleSignup}
                                disabled={!essential1 || !essential2} 
                            />
                        </PinkButtonBottomWrapper>
                    </CustomBottomSheet>
                )}
            </Layout>
        </TouchableWithoutFeedback>
    )
}

const Layout = styled.View`
    background-color: #FFFFFF;
    flex: 1;
`

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

const StyledInput = styled(TextInput)`
    border-radius: 15px;
    border: 1px solid rgba(255, 126, 148, 0.5);
    background-color: ${Colors.back};
    width: 100%;
    height: 50.33px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 18px;
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
