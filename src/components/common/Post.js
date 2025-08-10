import React from 'react';
import styled from 'styled-components';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Like from '../../../assets/images/community/like.png';
import Comment from '../../../assets/images/community/comment.png';
import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const Post = ({ post }) => {
    const navigation = useNavigation();
    const getRelativeTime = (isoString) => {
        return formatDistanceToNow(new Date(isoString), { addSuffix: true, locale: ko });
    }
    
    return (
        <Wrapper onPress={() => navigation.navigate("CommunityDetail")}>
            <Top>
                <Left>
                    <Title>{post.title}</Title>
                    <Content>{post.content}</Content>
                </Left>
                {post.image && (
                    <PostImage src={post.image}/>
                )}
            </Top>
            <Bottom>
                <UserInfo>
                    <BottomText>{post.region}</BottomText>
                    <UserInfoLine />
                    <BottomText>{post.nationality}</BottomText>
                    <UserInfoLine />
                    <BottomText>{getRelativeTime(post.createdAt)}</BottomText>
                </UserInfo>
                <PostInfo>
                    <PostInfoGroup>
                        <Image source={Like}/>
                        <BottomText>{post.likeCount}</BottomText>
                    </PostInfoGroup>
                    <PostInfoGroup>
                        <Image source={Comment}/>
                        <BottomText>{post.commentCount}</BottomText>
                    </PostInfoGroup>
                </PostInfo>
            </Bottom>
        </Wrapper>
    )
}

const Wrapper = styled(TouchableOpacity)`
    width: 100%;
    padding: 10px 0;
    border-color: #E6E6E6;
    border-bottom-width: 1;
`

const Top = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
`

const Left = styled.View`
    display: flex;
    flex: 1;
`

const PostImage = styled(Image)`
    height: 71px;
    width: 90px;
    object-fit: cover;
    border-radius: 5px;
    margin-left: 5px;
`

const Title = styled.Text`
    font-family: 'semiBold';
    font-size: 17px;
    line-height: 22px;
    margin-bottom: 5px;
`

const Content = styled.Text`
    font-family: 'regular';
    font-size: 15px;
    line-height: 22px;
`

const Bottom = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

const UserInfo = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const BottomText = styled.Text`
    font-size: 13px;
    font-family: 'regular';
    line-height: 22px;
`

const UserInfoLine = styled.View`
    background-color: #999999;
    width: 1px;
    margin: 0 5px;
    height: 15px;
`

const PostInfo = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

const PostInfoGroup = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`

export default Post