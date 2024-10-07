import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParams } from './screens/RootStackParams';
import HomeScreen from './screens/Home';
import MenuScreen from './screens/Menu';
import CoursesScreen from './screens/Courses'; 

import React from 'react';

const Stack = createStackNavigator<RootStackParams>();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="Courses" component={CoursesScreen} /> 
            </Stack.Navigator>
        </NavigationContainer>
    );
}
