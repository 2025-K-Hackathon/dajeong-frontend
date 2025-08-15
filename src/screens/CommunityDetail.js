import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, ScrollView } from 'react-native';
import { Colors }from '../theme';
import styled from 'styled-components';
import { CustomHeader, Comment } from './../components';
import { PostDetail } from './../constant/communityDetailData';
import Like from '../../assets/images/community/like.png';
import Unlike from '../../assets/images/community/unlike.png';
import CommentIcon from '../../assets/images/community/comment.png';
import Send from '../../assets/images/community/send.png';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import axiosInstance from '../utils/axiosInstance';

const CommunityDetail = ({ route }) => {
    const navigation = useNavigation();
    const { postId } = route.params;
    const [post, setPost] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const isFocused = useIsFocused();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState();

    const getRelativeTime = (isoString) => {
        return formatDistanceToNow(new Date(isoString), { addSuffix: false, locale: ko });
    }

    const handleDetail = async () => {
        try {
            const response = await axiosInstance.get(`/api/posts/${postId}/detail`);
            console.log('게시글 내용', response.data);
            setPost(response.data);
        } catch(error) {
            console.log('게시글 내용 조회 실패', error.response);
        }
    }

    const handleCommentList = async () => {
        try {
            const response = await axiosInstance.get(`/api/posts/${postId}/comments`);
            console.log('댓글 조회', response.data);
            setComments(response.data);
        } catch(error) {
            console.log('댓글 조회 실패', error.response);
        }
    }

    const handleComment = async () => {
        try {
            const response = await axiosInstance.post(`/api/posts/${postId}/comments`, {
                content,
            });
            console.log('댓글 작성', response);
            setContent('');
            handleCommentList();
        } catch(error) {
            console.log('댓글 작성 실패', error.response);
        }
    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        if (isFocused) {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' }
            });
        }

        return () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    height: 96,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 4,
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    paddingTop: 10,
                },
                tabBarItemStyle: {
                    height: 96,
                }
            });
        };
    }, [isFocused]);

    useEffect(() => {
        handleDetail();
        handleCommentList();
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={0}
            style={{ flex: 1 }}
        >
            <Layout>
                <CustomHeader type="text" text="글 상세" onBackPress={() => navigation.navigate('CommunityList')}/>
                {post && (
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 96 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <TitleWrapper>
                            <Title>{post.title}</Title>
                            <WriterWrapper>
                                <WriterText>{post.region}</WriterText>
                                <Line />
                                <WriterText>{post.nationality}</WriterText>
                                <Line />
                                <WriterText>{getRelativeTime(post.createdAt)}</WriterText>
                            </WriterWrapper>
                        </TitleWrapper>
                        <Wrapper>
                            <Content>{post.content}</Content>
                            {post.imageUrls.length>0 && <ContentImage src={post.imageUrls[0]} />}
                            <ReactionWrapper>
                                <MyLikeWrapper>
                                    <Image source={isLiked ? Like : Unlike} />
                                    <MyLikeText>좋아요</MyLikeText>
                                </MyLikeWrapper>
                                <RowWrapper>
                                    <LikeCommentWrapper>
                                        <Image source={Like} />
                                        <LikeCommentText>{post.likeCount}</LikeCommentText>
                                    </LikeCommentWrapper>
                                    <LikeCommentWrapper>
                                        <Image source={CommentIcon} />
                                        <LikeCommentText>{post.commentCount}</LikeCommentText>
                                    </LikeCommentWrapper>
                                </RowWrapper>
                            </ReactionWrapper>
                        </Wrapper>
                        <DividingLine />
                        <CommentWrapper>
                            {comments.map((comment, index) => (
                            <Comment
                                key={index}
                                region={comment.region}
                                nationality={comment.nationality}
                                time={getRelativeTime(comment.createdAt)}
                                content={comment.content}
                            />
                            ))}
                        </CommentWrapper>
                    </ScrollView>
                )}
                {/* 댓글 입력창 */}
                <CommentInputLayout style={{ position: 'absolute', bottom: keyboardHeight }}>
                    <CommentInputWrapper>
                        <CommentInput 
                            placeholder="댓글을 남겨보세요!" 
                            value={content} 
                            onChangeText={setContent}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                            <TouchableOpacity 
                                onPress={() => {
                                    Keyboard.dismiss();
                                    if (content) handleComment();
                                }}
                            >
                                <CommentImage source={Send} />
                            </TouchableOpacity>
                    </CommentInputWrapper>
                </CommentInputLayout>
            </Layout>
        </KeyboardAvoidingView>
    )
}

const Layout = styled.View`
    background-color: #FFFFFF;
    flex: 1;
`

const Wrapper = styled.View`
    padding: 0 25px;
`

const TitleWrapper = styled.View`
    background-color: #FFF6F6;
    width: 100%;
    padding: 15px 25px;
    margin-bottom: 15px;
`

const Title = styled.Text`
    font-size: 17px;
    line-height: 22px;
    font-family: 'semiBold';
    margin-bottom: 5px;
`

const WriterWrapper = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`

const WriterText = styled.Text`
    font-size: 13px;
    font-family: 'regular';
    line-height: 22px;
`

const Line = styled.View`
    height: 14px;
    width: 1px;
    background-color: #7F7B7B;
    margin: 0 5px;
`

const Content = styled.Text`
    font-size: 15px;
    font-family: 'regular';
    line-height: 22px;
    margin-bottom: 22px;
`

const ContentImage = styled(Image)`
    width: 100%;
    height: 310px;
    border-radius: 15px;
    object-fit: cover;
    margin-bottom: 18px;
`

const ReactionWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 13px;
`

const MyLikeWrapper = styled(TouchableOpacity)`
    background-color: #F0F0F0;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 88px;
    height: 34px;
    gap: 5px;
`

const MyLikeText = styled.Text`
    font-size: 13px;
    font-family: 'medium';
    line-height: 16px;
    color: #787878;
`

const RowWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 17px;
`

const LikeCommentWrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 6px;
`

const LikeCommentText = styled.Text`
    font-size: 15px;
    font-family: 'regular';
    line-height: 26px;
`

const DividingLine = styled.View`
    background-color: #F2F2F2;
    height: 13px;
    width: 100%;
`

const CommentWrapper = styled.View`
    display: flex;
    padding: 0 25px;
`

const CommentInputLayout = styled.View`
    background-color: #FFFFFF;
    height: 96px;
    width: 100%;
    padding: 0 15px;
    /* 그림자 */
    shadow-color: rgba(0, 0, 0, 1);
    shadow-offset: {
        width: 0px;
        height: -4px;
    };
    shadow-opacity: 0.2;
    shadow-radius: 4px;
    z-index: 10;
`

const CommentInputWrapper = styled.View`
    border: 1px solid ${Colors.main};
    width: 100%;
    height: 42px;
    margin: 7px 0;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border-radius: 100px;
`

const CommentInput = styled(TextInput)`
    font-size: 15px;
    line-height: 22px;
    width: 100%;
    padding: 0 15px;
`

const CommentImage = styled(Image)`
    margin-right: 10px;
`

export default CommunityDetail
