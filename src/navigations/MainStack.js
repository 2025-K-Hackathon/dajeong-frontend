import React, { useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LoginStack from './LoginStack';
import BottomTab from './BottomTab';

const Stack = createStackNavigator();

const MainStack = () => {
    const [isLogin, setIsLogin] = useState(false);

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
