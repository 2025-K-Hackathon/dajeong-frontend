import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AiDiaryCreate, AiDiaryDetail } from '../screens';

const Stack = createStackNavigator();

const AiDiaryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AiDiaryCreate" component={AiDiaryCreate} />
            <Stack.Screen name="AiDiaryDetail" component={AiDiaryDetail} />
        </Stack.Navigator>
    )
}

export default AiDiaryStack
