import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RootStackParams } from './RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';


interface Course {
  dishName: string;
  description: string;
  courseType: string;
  price: number;
}

type HomeScreenProp = StackNavigationProp<RootStackParams, 'Home'>;

export default function HomeScreen() {
  
  const navigation = useNavigation<HomeScreenProp>();
  const [courses] = useState<Course[]>([]); 

  
  const handleViewMenu = () => {
    navigation.navigate('Menu', { courses });
  };

 
  const handleAddCourse = () => {
    navigation.navigate('Courses', { courses });
  };

  return (
    <ImageBackground
      source={require('../img/splash.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Christoffel's Menu</Text>

        <View style={styles.buttonContainer}>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleViewMenu} 
          >
            <Text style={styles.buttonText}>View Menu</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddCourse} 
          >
            <Text style={styles.buttonText}>Add Course</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 70,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 200,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5C0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 7,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    height: 20,
  },
});
