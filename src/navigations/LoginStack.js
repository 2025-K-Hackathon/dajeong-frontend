import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome, Signup1, Signup2, Login, TermsOfUse } from './../screens';

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Welcome' 
                component={Welcome}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Signup1' 
                component={Signup1}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Signup2' 
                component={Signup2}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='TermsOfUse' 
                component={TermsOfUse}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Login' 
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default LoginStack
