import React, { useEffect, useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LoginStack from './LoginStack';
import BottomTab from './BottomTab';
import axiosInstance from '../utils/axiosInstance';

const Stack = createStackNavigator();

const MainStack = () => {
    const [isLogin, setIsLogin] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.get('/api/users/me');
            if (response.status === 200) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        } catch(error) {
            setIsLogin(false);
        }
    }

    useEffect(() => {
        handleLogin();
    }, [])

    return (
        <Stack.Navigator>
            { isLogin ? (
                <Stack.Screen 
                    name='BottomTab' 
                    component={BottomTab} 
                    options={{
                        headerShown: false,
                    }}
                />
            ) : (
                <Stack.Screen 
                    name='LoginStack' 
                    component={LoginStack} 
                    options={{
                        headerShown: false,
                    }}
                />
            )}
        </Stack.Navigator>
    )
}

export default MainStack
