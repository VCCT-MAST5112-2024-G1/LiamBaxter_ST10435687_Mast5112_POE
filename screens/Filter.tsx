import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParams } from './RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';

interface Course {
    dishName: string;
    description: string;
    courseType: string;
    price: number;
}

export default function FilterScreen() {
    const route = useRoute();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  
    const { courses } = route.params as { courses: Course[] };

    const [selectedType, setSelectedType] = useState<string | null>(null);

    const filteredCourses = selectedType
        ? courses.filter((course) => course.courseType === selectedType)
        : courses;
// if satement for filtering through array
    const handleFilter = (type: string) => {
        if (selectedType === type) {
            setSelectedType(null); 
        } else {
            setSelectedType(type);
        }
    };

    const renderCourseItem = ({ item }: { item: Course }) => (
        <View style={styles.courseItem}>
            <Text style={styles.dishName}>{item.dishName}</Text>
            <Text>{item.description}</Text>
            <Text>Type: {item.courseType}</Text>
            <Text>Price: R{item.price.toFixed(2)}</Text>
        </View>
    );

    return (
        <ImageBackground source={require('../img/menu.jpg')} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.filterButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.filterButton, selectedType === 'Starter' && styles.selectedButton]}
                        onPress={() => handleFilter('Starter')}
                    >
                        <Text style={styles.buttonText}>Starter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterButton, selectedType === 'Main' && styles.selectedButton]}
                        onPress={() => handleFilter('Main')}
                    >
                        <Text style={styles.buttonText}>Main</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterButton, selectedType === 'Dessert' && styles.selectedButton]}
                        onPress={() => handleFilter('Dessert')}
                    >
                        <Text style={styles.buttonText}>Dessert</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filteredCourses}
                    renderItem={renderCourseItem}
                    keyExtractor={(item) => item.dishName}
                    style={styles.list}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    filterButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    filterButton: {
        flex: 1,
        backgroundColor: '#5C0000',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#800000',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    list: {
        flex: 1,
    },
    courseItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    dishName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});


