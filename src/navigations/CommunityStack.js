import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommunityList, CommunityCreate, CommunityDetail } from '../screens';

const Stack = createStackNavigator();

const CommmunityStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="CommunityList" 
                component={CommunityList} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="CommunityCreate" 
                component={CommunityCreate} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="CommunityDetail" 
                component={CommunityDetail} 
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default CommmunityStack
