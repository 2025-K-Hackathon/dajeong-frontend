import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import Clicked from '../../../assets/images/signup/clicked.png';
import Unclicked from '../../../assets/images/signup/unclicked.png';

const Dropdown = ({ contents }) => {
    const [isVisible, setIsVisible] = useState(false); // 드롭다운 내용 보여지는지
    const [selectedContent, setSelectedContent] = useState(''); // 선택된 내용

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    };

    const selectContent = (content) => {
        setSelectedContent(content);
        setIsVisible(false);
    };

    return (
        <View>
            <DropdownBox onPress={toggleDropdown}>
                {selectedContent ? (
                    <ContentRow>
                        <Content>{selectedContent.name}</Content>
                        {selectedContent.english && (
                            <ContentEng>{selectedContent.english}</ContentEng>
                        )}
                    </ContentRow>
                ) : (
                    <PlaceholderText>선택</PlaceholderText>
                )}
                {isVisible ? (
                    <DropdownIcon source={Clicked} />
                ) : (
                    <DropdownIcon source={Unclicked} />
                )}
            </DropdownBox>
            {isVisible && (
                <DropdownList>
                    {contents.map((content, index) => (
                        <DropdownItem key={index} onPress={() => selectContent(content)}>
                            <ContentRow>
                                <ContentName>{content.name}</ContentName>
                                {content.english && (
                                    <ContentEng>{content.english}</ContentEng>
                                )}
                            </ContentRow>
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </View>
    )
}

const DropdownBox = styled.TouchableOpacity`
    border: 1px solid rgba(255, 126, 148, 0.5);
    background-color: ${Colors.back};
    border-radius: 15px;
    padding: 0 18px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
`

const PlaceholderText = styled.Text`
    color: #B1ADAD;
    font-family: 'semiBold';
    font-size: 15px;
`

const DropdownList = styled.View`
    margin-top: 10px;
    border-radius: 15px;
    background-color: ${Colors.white};
    padding: 15px 9px;
    position: absolute;
    top: 50px;
    z-index: 1;
    width: 100%;
    /* 그림자 */
    shadow-color: #000000;
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.54;
    shadow-radius: 15px;
    elevation: 4;
`

const DropdownItem = styled.TouchableOpacity`
    border-bottom-width: 1px;
    border-bottom-color: #E2DFDF;
    height: 43px;
    display: flex;
    justify-content: center;
    padding: 0 14px;
`

const ContentRow = styled.View`
    flex-direction: row;
    align-items: center;
`

const Content = styled.Text`
    font-family: 'semiBold';
    font-size: 15px;
    color: ${Colors.black};
`

const ContentName = styled.Text`
    font-family: 'semiBold';
    font-size: 15px;
    color: ${Colors.black};
    min-width: 65px;
`

const ContentEng = styled.Text`
    font-family: 'semiBold';
    font-size: 13px;
    color: #7F7F7F;
    margin-left: 24px;
`

const DropdownIcon = styled(Image)`
    width: 16px;
    height: 16px;
`

Dropdown.propTypes = {
    contents: PropTypes.array.isRequired,
}

export default Dropdown
