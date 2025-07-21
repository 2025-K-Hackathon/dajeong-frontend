import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Mypage } from '../screens';
import LivingInfoStack from './LivingInfoStack';
import AiDiaryStack from './AiDiaryStack';
import CommmunityStack from './CommunityStack';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='LivingInfoStack' component={LivingInfoStack} />
            <Tab.Screen name='AiDiaryStack' component={AiDiaryStack} />
            <Tab.Screen name='CommmunityStack' component={CommmunityStack} />
            <Tab.Screen name='Mypage' component={Mypage} />
        </Tab.Navigator>
    )
}

export default BottomTab
