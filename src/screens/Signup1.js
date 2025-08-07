import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomHeader, PinkButton } from '../components';
import axiosInstance from './../utils/axiosInstance';

const Signup1 = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [isReady, setIsReady] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const IdRef = useRef(null);
    const passwordRef = useRef(null);

    const handleName = (name) => {
        setName(name);
    }

    const handleId = (id) => {
        setId(id);
    }

    const handlePassword = (password) => {
        setPassword(password);
    }

    useEffect(() => {
        console.log(name, id, password);
        if (name!=='' && id!=='' && password!=='') {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    }, [name, id, password])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Layout>
                <SafeAreaView>
                    <CustomHeader back={false}/>
                    <Wrapper>
                        <InputWrapper>
                            <View>
                                <Title>이름</Title>
                                <StyledInput 
                                    value={name}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    onChangeText={handleName}
                                    onSubmitEditing={() => IdRef.current.focus()}
                                />
                            </View>
                            <View>
                                <Title>아이디</Title>
                                <StyledInput 
                                    value={id}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    onChangeText={handleId}
                                    onSubmitEditing={() => passwordRef.current.focus()}
                                    ref={IdRef}
                                />
                            </View>
                            <View>
                                <Title>비밀번호</Title>
                                <StyledInput 
                                    value={password}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="done"
                                    onChangeText={handlePassword}
                                    ref={passwordRef}
                                />
                            </View>
                        </InputWrapper>
                    </Wrapper>
                </SafeAreaView>
                <PinkButtonWrapper paddingBottom={insets.bottom + 57}>
                    <PinkButton 
                        text="다음" 
                        onPress={() => navigation.navigate("Signup2", { name, id, password })}
                        disabled={!isReady} 
                    />
                </PinkButtonWrapper>
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

const InputWrapper = styled.View`
    display: flex;
    gap: 9px;
    margin-bottom: 29px;
`

const Title = styled.Text`
    height: 27px;
    font-size: 18px;
    font-family: 'semiBold';
    color: ${Colors.black};
    margin-bottom: 10px;
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
    padding: 0 10px;
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

const PinkButtonWrapper = styled.View`
    position: absolute;
    width: 100%;
    margin: 0 auto;
    bottom: 10px;
    padding: 0 25px ${({ paddingBottom }) => `${paddingBottom}px`};
`

export default Signup1
