import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Recommend, CardList, CardDetail, CardCreate } from '../screens';

const Stack = createStackNavigator();

const LivingInfoStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Recommend" component={Recommend} />
            <Stack.Screen name="CardList" component={CardList} />
            <Stack.Screen name="CardDetail" component={CardDetail} />
            <Stack.Screen name="CardCreate" component={CardCreate} />
        </Stack.Navigator>
    )
}

export default LivingInfoStack
