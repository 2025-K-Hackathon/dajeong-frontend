import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { Home, AiDiary, Mypage } from '../screens';
import LivingInfoStack from './LivingInfoStack';
import CommmunityStack from './CommunityStack';

const Tab = createBottomTabNavigator();

const TabIcon = ({ source, size }) => {
    return (
        <Image
            source={source}
            style={{
                width: size, 
                height: size, 
                resizeMode: 'contain',
                marginBottom: 9,
                alignItems: 'center',
            }}
        />
    )
}

const BottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#FF7E94',
                tabBarInactiveTintColor: '#A4A4A4',
                tabBarStyle: {
                    height: 96,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 4,
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    paddingTop: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 8,
                    fontFamily: 'regular'
                }
            }}
            >
            <Tab.Screen 
                name='LivingInfoStack' 
                component={LivingInfoStack} 
                options={{
                    title: '생활 정보',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            source={
                                focused 
                                ? require('../../assets/images/common/living-info-clicked.png')
                                : require('../../assets/images/common/living-info.png')
                            }
                            size={23}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='AiDiary' 
                component={AiDiary} 
                options={{
                    title: 'AI 일기',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            source={
                                focused 
                                ? require('../../assets/images/common/ai-diary-clicked.png')
                                : require('../../assets/images/common/ai-diary.png')
                            }
                            size={23}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='Home' 
                component={Home} 
                options={{
                    title: '홈',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            source={
                                focused 
                                ? require('../../assets/images/common/home-clicked.png')
                                : require('../../assets/images/common/home.png')
                            }
                            size={23}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='CommmunityStack' 
                component={CommmunityStack} 
                options={{
                    title: '커뮤니티',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            source={
                                focused 
                                ? require('../../assets/images/common/community-clicked.png')
                                : require('../../assets/images/common/community.png')
                            }
                            size={23}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='Mypage' 
                component={Mypage} 
                options={{
                    title: '마이페이지',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            source={
                                focused 
                                ? require('../../assets/images/common/mypage-clicked.png')
                                : require('../../assets/images/common/mypage.png')
                            }
                            size={23}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab
