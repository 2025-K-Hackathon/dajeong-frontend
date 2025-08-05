import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Recommend, NewsDetail, CardList, CardDetail, CardCreate } from '../screens';

const Stack = createStackNavigator();

const LivingInfoStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Recommend" 
                component={Recommend} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="NewsDetail" 
                component={NewsDetail} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="CardList" 
                component={CardList} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="CardDetail" 
                component={CardDetail} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="CardCreate" 
                component={CardCreate} 
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default LivingInfoStack
