import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../theme';
import { CustomMiniHeader, Filtering, Post } from '../components';
import Plus from '../../assets/images/community/plus.png';
import axiosInstance from './../utils/axiosInstance';

const CommunityList = ({ navigation }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedValues, setSelectedValues] = useState({
        order: null,
        country: null,
        age: null,
        region: null,
    });
    const [posts, setPosts] = useState([]);

    const filters = {
        order: {
            label: '추천순',
            options: ['최신순', '인기순'],
        },
        country: {
            label: '국가별',
            options: ['전체', '베트남', '중국', '필리핀', '태국', '인도네시아', '기타'],
        },
        age: {
            label: '연령대별',
            options: ['전체', '20대', '30대', '40대', '50대', '60대'],
        },
        region: {
            label: '지역별',
            options: ['전체', '수도권', '충청도', '강원도', '경상도', '전라도', '제주도'],
        },
    };

    const filterWidths = {
        order: 75,
        country: 100,
        age: 90,
        region: 75,
    };

    const handleSelect = (key, value) => {
        setSelectedValues((prev) => ({ ...prev, [key]: value }));
        setOpenDropdown(null);
    }

    const handlePosts = async () => {
        try {
            const orderMap = {
                '최신순': 'recent',
                '인기순': 'popular'
            };

            const nationalityMap = {
                '베트남': 'VIETNAM',
                '중국': 'CHINA',
                '필리핀': 'PHILIPPINES',
                '태국': 'THAILAND',
                '인도네시아': 'INDONESIA',
                '기타': 'ETC'
            };

            const ageMap = {
                '20대': 'TWENTIES',
                '30대': 'THIRTIES',
                '40대': 'FORTIES',
                '50대': 'FIFTIES',
                '60대': 'SIXTIES_OVER'
            };

            const regionMap = {
                '수도권': 'CAPITAL',
                '충청도': 'CHUNGCHEONG',
                '강원도': 'GANGWON',
                '경상도': 'GYEONGSANG',
                '전라도': 'JEOLLA',
                '제주도': 'JEJU'
            };

            const params = {
                ...(selectedValues.order && { sort: orderMap[selectedValues.order] }),
                ...(selectedValues.country && selectedValues.country !== '전체' && { nationality: nationalityMap[selectedValues.country] }),
                ...(selectedValues.age && selectedValues.age !== '전체' && { ageGroup: ageMap[selectedValues.age] }),
                ...(selectedValues.region && selectedValues.region !== '전체' && { region: regionMap[selectedValues.region] }),
            }

            const response = await axiosInstance.get('/api/posts', {params});
            console.log('게시글 조회', response.data);
            setPosts(response.data)
        } catch(error) {
            console.log('게시글 조회', error.response);
        }
    }

    useEffect(() => {
        handlePosts();
    }, [selectedValues])

    return (
        <Layout>
            <Wrapper>
                <CustomMiniHeader text="커뮤니티" marginBottom={16}/>
            </Wrapper>
            <FilterWrapper>
                {Object.entries(filters).map(([key, { label, options }]) => (
                    <Filtering
                        key={key}
                        filterKey={key}
                        selectedValue={selectedValues[key] ?? label}
                        options={options}
                        isOpen={openDropdown === key}
                        onOpen={() => setOpenDropdown(openDropdown === key ? null : key)}
                        onSelect={handleSelect}
                        width={filterWidths[key]}
                    />
                ))}
            </FilterWrapper>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <Post post={item} />
                )}
                keyExtractor={(item , index) => index.toString()}
                contentContainerStyle={{marginLeft: 15, marginRight: 15, marginBottom: 96}}
            />
            <WritingButton onPress={() => navigation.navigate('CommunityCreate')}>
                <Image source={Plus}/>
                <WritingButtonText>글쓰기</WritingButtonText>
            </WritingButton>
        </Layout>
    )
}

const Layout = styled.View`
    background-color: #FFFFFF;
    flex: 1;
`

const Wrapper = styled.View`
    padding: 0 15px;
`

const FilterWrapper = styled.View`
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    height: 47px;
    background-color: #F7F4F7;
    width: 100%;
`

const WritingButton = styled(TouchableOpacity)`
    width: 113px;
    height: 41px;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 8px;
    background-color: ${Colors.main};
    position: absolute;
    right: 15px;
    bottom: 8px;
`

const WritingButtonText = styled.Text`
    color: #FFFFFF;
    font-family: 'semiBold';
    font-size: 16px;
    line-height: 20px;
`

export default CommunityList
