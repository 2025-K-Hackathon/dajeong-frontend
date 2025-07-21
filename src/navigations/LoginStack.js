import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome, Signup1, Signup2, Login } from './../screens';

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Welcome' component={Welcome}/>
            <Stack.Screen name='Signup1' component={Signup1}/>
            <Stack.Screen name='Signup2' component={Signup2}/>
            <Stack.Screen name='Login' component={Login}/>
        </Stack.Navigator>
    )
}

export default LoginStack
