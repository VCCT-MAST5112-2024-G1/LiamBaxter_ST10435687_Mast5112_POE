
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParams } from './screens/RootStackParams';
import MenuScreen from './screens/Menu';
import CoursesScreen from './screens/Courses'; 
import FilterScreen from './screens/Filter';

import React from 'react';

const Stack = createStackNavigator<RootStackParams>();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Menu" component={MenuScreen} />
                <Stack.Screen name="Courses" component={CoursesScreen} /> 
                <Stack.Screen name="Filter" component={FilterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
