import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { Colors } from '../../theme';

const AiDiaryCorrection = ({ originalText, corrections }) => {
    const renderedText = [];
    let currentIndex = 0;

    corrections.sort((a, b) => a.start - b.start);

    corrections.forEach((correction, index) => {
        const { start, end, incorrect, corrected } = correction;

        if (currentIndex < start) {
            renderedText.push(
                <OriginTextWrapper key={`text-${index}-normal`}>
                    <OriginText>{originalText.slice(currentIndex, start)}</OriginText>
                </OriginTextWrapper>
            )
        }

        renderedText.push(
            <CorrectionWrapper key={`text-${index}-correction`}>
                <CorrectedText>{corrected}</CorrectedText>
                <IncorrectText>{incorrect}</IncorrectText>
            </CorrectionWrapper>
        )

        currentIndex = end;
    })

    if (currentIndex < originalText.length) {
        renderedText.push(
        <OriginTextWrapper key={`text-final`}>
            <OriginText>{originalText.slice(currentIndex)}</OriginText>
        </OriginTextWrapper>
        )
    }

    return (
        <Wrapper>
            {renderedText}
        </Wrapper>
    )
}

const Wrapper = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
`

const CorrectionWrapper = styled.View`
    align-items: center;
`

const CorrectedText = styled.Text`
    font-size: 13px;
    font-family: 'bold';
    color: #7F7F7F;
`

const IncorrectText = styled.Text`
    color: ${Colors.main};
    font-size: 15px;
    font-family: 'medium';
    line-height: 23px;
    text-decoration: underline;
`

const OriginTextWrapper = styled.View`
    display: flex;
    justify-content: flex-end;
`

const OriginText = styled.Text`
    font-size: 15px;
    font-family: 'medium';
    line-height: 23px;
`

export default AiDiaryCorrection
