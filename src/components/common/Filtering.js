import React from 'react';
import styled from 'styled-components/native';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import Down from '../../../assets/images/community/down.png';
import Up from '../../../assets/images/community/up.png';

const Filtering = ({ filterKey, selectedValue, options, isOpen, onOpen, onSelect, width }) => {
    return (
        <Container width={width}>
            <Selector onPress={onOpen}>
                <SelectorText>{selectedValue}</SelectorText>
                <Image source={Down} />
            </Selector>
            {isOpen && (
                <Dropdown>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item}
                        renderItem={({ item, index  }) => (
                            <DropdownItem onPress={() => onSelect(filterKey, item)}>
                                <DropdownText>{item}</DropdownText>
                                {index === 0 && <Image source={Up}/>}
                            </DropdownItem>
                        )}
                        ItemSeparatorComponent={() => <Line />}
                    />
                </Dropdown>
            )}
        </Container>
    )
}

const Container = styled.View`
    position: relative;
    width: ${({ width }) => width}px;
`

const Selector = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-radius: 24px;
    padding: 4px 10px;
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

const SelectorText = styled.Text`
    font-size: 15px;
    font-family: 'regular';
    line-height: 22px;
    color: #333333;
`

const Dropdown = styled.View`
    position: absolute;
    background-color: white;
    border-radius: 15px;
    padding: 8px 0;
    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 1);
    shadow-offset: {
        width: 0px;
        height: 0px;
    };
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 4;
    z-index: 1;
    width: 100%;
`

const DropdownItem = styled.TouchableOpacity`
    padding: 2px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

const DropdownText = styled.Text`
    font-size: 15px;
    font-family: 'regular';
    line-height: 22px;
    color: #333333;
    padding: 0 2px;
`

const Line = styled.View`
    height: 1px;
    background-color: #E6E6E6;
    margin: 0 8px;
`

export default Filtering;
