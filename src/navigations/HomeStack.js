import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Recommend, NewsDetail, CardList, CardDetail, CardCreate } from '../screens';

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{
                    headerShown: false,
                }}
            />
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

export default HomeStack
