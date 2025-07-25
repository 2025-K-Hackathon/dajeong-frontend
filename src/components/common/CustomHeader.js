import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LogoDark from '../../../assets/images/main/logo-dark.png';
import Back from '../../../assets/images/common/back.png';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ type="image", text="", back=true }) => {
    const navigation = useNavigation();

    return (
        <Wrapper>
            { back && (
                <BackWrapper onPress={() => navigation.goBack()}>
                    <Image source={Back} />
                </BackWrapper>
            )}

            {type==="image" 
                ? <Logo source={LogoDark} />
                : <Title>{text}</Title>
            }
        </Wrapper>
    )
}

const Wrapper = styled.View`
    width: 100%;
    margin-top: 40px;
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

CustomHeader.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    back: PropTypes.bool,
}

export default CustomHeader
