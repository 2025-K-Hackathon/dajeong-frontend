import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../theme';
import PropTypes from 'prop-types';

const WhiteButton = ({ text, width=276, height=50, onPress }) => {
    return (
        <Wrapper width={width} height={height} onPress={onPress}>
            <StyledText>{ text }</StyledText>
        </Wrapper>
    )
}

const Wrapper = styled.TouchableOpacity`
    border-radius: 15px;
    border: 1px solid ${Colors.main};
    background-color: ${Colors.white};
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* 그림자 */
    shadow-color: #000;
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 4;
;
`

const StyledText = styled.Text`
    font-family: 'semiBold';
    font-size: 18px;
    color: ${Colors.main};
`

WhiteButton.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    onPress: PropTypes.func,
}

export default WhiteButton
