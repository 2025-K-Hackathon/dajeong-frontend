import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../theme';
import PropTypes from 'prop-types';

const PinkButton = ({ text, width="100%", height=50, onPress, shadow=false, disabled=false }) => {
    return (
        <Wrapper width={width} height={height} onPress={onPress} shadow={shadow} disabled={disabled}>
            <StyledText>{ text }</StyledText>
        </Wrapper>
    )
}

const Wrapper = styled.TouchableOpacity`
    border-radius: 15px;
    border: 1px solid ${Colors.white};
    background-color: ${Colors.main};
    width: ${(props) => (typeof props.width === 'number' ? `${props.width}px` : props.width)};
    height: ${(props) => props.height}px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* 그림자 */
    ${(props) => props.shadow && `
        shadow-color: #000;
        shadow-offset: {
            width: 0px;
            height: 0px;
        };
        shadow-opacity: 0.25;
        shadow-radius: 4px;
        elevation: 4;
    `}
`

const StyledText = styled.Text`
    font-family: 'semiBold';
    font-size: 18px;
    color: ${Colors.white};
`

PinkButton.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.number,
    onPress: PropTypes.func,
    shadow: PropTypes.bool,
    disabled: PropTypes.bool,
}

export default PinkButton
