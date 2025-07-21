import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommunityList, CommunityCreate, CommunityDetail } from '../screens';

const Stack = createStackNavigator();

const CommmunityStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CommunityList" component={CommunityList} />
            <Stack.Screen name="CommunityCreate" component={CommunityCreate} />
            <Stack.Screen name="CommunityDetail" component={CommunityDetail} />
        </Stack.Navigator>
    )
}

export default CommmunityStack
