import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LogoDark from '../../../assets/images/main/logo-dark.png';
import Back from '../../../assets/images/common/back.png';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Colors } from './../../theme';

const CustomHeader = ({ type="image", text="", back=true, buttonText, onPress, onBackPress }) => {
    const statusBarHeight = getStatusBarHeight();
    const navigation = useNavigation();

    return (
        <Wrapper marginTop={statusBarHeight+10}>
            { back && (
                <BackWrapper onPress={onBackPress ? onBackPress : () => navigation.goBack()} >
                    <Image source={Back} />
                </BackWrapper>
            )}
            {type==="image" 
                ? <Logo source={LogoDark} />
                : <Title>{text}</Title>
            }
            {buttonText && (
                <ButtonWrapper onPress={onPress}>
                    <ButtonText>{buttonText}</ButtonText>
                </ButtonWrapper>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.View`
    width: 100%;
    margin-top: ${(props) => props.marginTop};
    height: 42.19px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Logo = styled(Image)`
    width: 83.08px;
    height: 100%;
`

const Title = styled.Text`
    font-size: 17px;
    font-family: 'bold';
    height: 22px;
`

const BackWrapper = styled(TouchableOpacity)`
    position: absolute;
    left: 17.35px;
    align-self: center;
    justify-self: center;
`

const ButtonWrapper = styled(TouchableOpacity)`
    width: 85px;
    height: 31px;
    background-color: ${Colors.main};
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 15px;
`

const ButtonText = styled.Text`
    color: #FFFFFF;
    font-family: 'medium';
    font-size: 15px;
    line-height: 22px;
`

CustomHeader.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    back: PropTypes.bool,
    button: PropTypes.bool,
    buttonText: PropTypes.string,
    onPress: PropTypes.func,
    onBackPress: PropTypes.func,
}

export default CustomHeader
