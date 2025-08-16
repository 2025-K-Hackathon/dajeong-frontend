import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import { CustomMiniHeader, AiDiaryCorrection, PinkButton } from './../components';
import { Colors } from '../theme';
import Change from '../../assets/images/livingInfo/change.png';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('ko')
import Right from '../../assets/images/livingInfo/right.png';
import Left from '../../assets/images/livingInfo/left.png';
import axiosInstance from './../utils/axiosInstance';

const AiDiary = () => {
    const [isWritten, setIsWritten] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentYear, setCurrentYear] = useState(moment().format('YYYY'));
    const [currentMonth, setCurrentMonth] = useState(moment().format('MM'));
    const [currentWeekStart, setCurrentWeekStart] = useState(moment());
    const [content, setContent] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [diaryId, setDiaryId] = useState(null);
    const [correct, setCorrect] = useState('');
    const [reply, setReply] = useState('');
    const [translateReply, setTranslateReply] = useState();
    
    const handleDateSelect = (date) => {
        const selected = moment(date);
        if (!selected.isValid()) {
            return;
        }
        setSelectedDate(selected);
        setCurrentMonth(selected.format('MM'));
        setCurrentYear(selected.format('YYYY'));
        fetchDiary(selected.format('YYYY-MM-DD'));
    }

    const handleWeekChange = (startOfWeek) => {
        const start = moment(startOfWeek);
        if (!start.isValid()) {
            return;
        }

        const endOfWeek = moment(start).add(6, 'days');
        setCurrentWeekStart(endOfWeek);
    }

    const handleDiaryWrite = async () => {
        try {
            const response = await axiosInstance.post('/api/diaries', {
                date: selectedDate.format('YYYY-MM-DD'),
                content
            })
            console.log('일기 작성', response.data);
            await fetchDiary(selectedDate.format('YYYY-MM-DD'));
            setContent('');
        } catch(error) {
            console.log('일기 작성 실패', error.response);
        }
    }

    const fetchDiary = async (date) => {
        try {
            const response = await axiosInstance.get('/api/diaries', {
                params: {date: date},
            });
            const diary = response.data[0];
            console.log('작성된 일기', diary);
            setIsWritten(true);
            setDiaryId(diary.id);
            setReply(diary.reply);
            await handleCorrect();
        } catch(error) {
            setIsWritten(false);
            console.log('작성된 일기 존재하지 않음');
            setCorrect('');
            setReply('');
        }
    }
    
    const handleCorrect = async () => {
        try {
            const response = await axiosInstance.get(`/api/diaries/${diaryId}/correct`);
            console.log('일기 교정', response.data);
            setCorrect(response.data);
        } catch(error) {
            console.log('일기 교정 실패', error.response);
        }
    }

    const handleReply = async () => {
        try {
            const response = await axiosInstance.get(`/api/diaries/${diaryId}/translate-reply`);
            console.log('일기 조언 번역', response.data);
            setTranslateReply(response.data);
        } catch(error) {
            console.log('일기 조언 번역 실패', error);
        }
    }

    useEffect(() => {
        fetchDiary(moment().format('YYYY-MM-DD'));
    }, []);

    useEffect(() => {
        if (content!=='') {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Layout>
                <Wrapper>
                    <CustomMiniHeader text='AI 일기' />
                    <CalendarStrip
                        scrollable
                        startingDate={moment()} // 시작 날짜
                        selectedDate={selectedDate} // 선택된 날짜
                        style={{ // 캘린더 wrapper
                            height: 140,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderRadius: 12,
                            marginTop: 15,
                        }}
                        calendarHeaderContainerStyle={{ // 캘린더 헤더 wrapper
                            marginBottom: 10,
                            backgroundColor: '#F7F4F7',
                            borderRadius: 5,
                            paddingVertical: 16,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        calendarHeaderStyle={{ // 캘린더 헤더
                            fontSize: 17,
                            fontFamily: 'medium',
                        }}
                        dayContainerStyle={{
                            gap: 0,
                        }}
                        dateNameStyle={{
                            color: '#333333',
                            fontSize: 14,
                            fontFamily: 'regular',
                        }}
                        dateNumberStyle={{
                            color: '#000000',
                            fontSize: 16,
                            fontFamily: 'semiBold',
                        }}
                        highlightDateNumberStyle={{ // 하이라이트된 요일 색상
                            color: '#FF7E94',
                            fontSize: 16,
                            fontFamily: 'extraBold',
                        }}
                        highlightDateNameStyle={{ // 하이라이트된 날짜 색상
                            color: '#FF7E94',
                            fontSize: 14,
                            fontFamily: 'extraBold',
                        }}
                        iconContainer={{ flex: 0.1 }}
                        leftSelector={
                            <ButtonWrapper>
                                <Image source={Left} />
                            </ButtonWrapper>
                        }
                        rightSelector={
                            <ButtonWrapper>
                                <Image source={Right} />
                            </ButtonWrapper>
                        }
                        onWeekChanged={handleWeekChange} // 주가 변경될 때
                        onDateSelected={handleDateSelect} // 요일 클릭했을 때 나타나는 함수
                    />
                </Wrapper>
                <ScrollView>
                {isWritten ? (
                    <>
                        {correct && (
                            <DiaryWrapper>
                                <AiDiaryCorrection
                                    originalText={correct.originalText}
                                    corrections={correct.corrections}
                                />
                            </DiaryWrapper>
                        )}
                        <ReplyWrapper>
                            {translateReply ? (
                                <ReplyText>{translateReply}</ReplyText>
                            ) : (
                                <>
                                    <ReplyText>{reply}</ReplyText>
                                    <TranslateButton onPress={handleReply}>
                                        <Image source={Change} />
                                        <TranslateText>번역</TranslateText>
                                    </TranslateButton>
                                </>
                            )}
                        </ReplyWrapper>
                    </>
                ) : (
                    <Wrapper>
                        <InputWrapper
                            placeholder='오늘의 감정을 자유롭게 작성해 보세요!'
                            multiline={true}
                            scrollEnabled={true}
                            value={content}
                            onChangeText={setContent}
                        />
                        <PinkButton
                            text="작성 완료"
                            height={45}
                            disabled={!isReady}
                            onPress={handleDiaryWrite}
                        />
                    </Wrapper>
                )}
                </ScrollView>
        </Layout>
        </TouchableWithoutFeedback>
    )
}

const Layout = styled.View`
    background-color: #ffffff;
    flex: 1;
`

const Wrapper = styled.View`
    padding: 0 15px;
`

const Line = styled.View`
    height: 20px;
    width: 1px;
    margin: 0 10px;
    background-color: #000000;
`

const DiaryWrapper = styled.View`
    padding: 20px 10px;
    background-color: #FFFFFF;
    border-radius: 15px;
    margin: 25px 15px 0 15px;
    min-height: 270px;
    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 1);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 2;
`

const ReplyWrapper = styled.View`
    background-color: ${Colors.main};
    border-radius: 10px;
    padding: 18px 10px;
    margin: 30px 15px 0 15px;
`

const ReplyText = styled.Text`
    font-size: 15px;
    font-family: 'semiBold';
    line-height: 23px;
    color: #FFFFFF;
`

const TranslateButton = styled(TouchableOpacity)`
    width: 60px;
    height: 26px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-left: auto;
`

const TranslateText = styled.Text`
    font-size: 12px;
    font-family: 'semiBold';
    color: #FFFFFF;
    line-height: 18px;
`

const ButtonWrapper = styled.View`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 1);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 4;
`

const InputWrapper = styled(TextInput)`
    border-radius: 15px;
    width: 100%;
    padding: 20px 10px;
    font-size: 15px;
    font-family: 'medium';
    line-height: 18px;
    text-align-vertical: top;
    background-color: #FFFFFF;
    min-height: 350px;
    margin-bottom: 18px;
    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 1);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 2;
`

export default AiDiary
