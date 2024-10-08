import React, { useState } from 'react';
import { Text, View, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParams } from './RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';

interface Course {
  dishName: string;
  description: string;
  courseType: string;
  price: number;
}

export default function CoursesScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute();
  
  const { courses: existingCourses } = route.params as { courses: Course[] };

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [courseType, setCourseType] = useState('Starter');
  const [price, setPrice] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddCourse = () => {
    if (!dishName || !description || !courseType || price === '') {
      alert('Please fill in all fields.');
      return;
    }

    const newCourse: Course = {
      dishName,
      description,
      courseType,
      price: Number(price),
    };

    const updatedCourses = [...existingCourses, newCourse];

    navigation.navigate('Menu', { courses: updatedCourses });

    setDishName('');
    setDescription('');
    setCourseType('Starter');
    setPrice('');
  };

  return (
    <ImageBackground source={require('../img/form.jpg')} style={styles.background}>
      <View style={styles.container}>
       
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonSmall]} onPress={() => navigation.navigate('Filter')}>
            <Text style={styles.buttonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Add a Course</Text>

        <TextInput
          placeholder="Dish Name"
          style={styles.input}
          value={dishName}
          onChangeText={setDishName}
        />

        <TextInput
          placeholder="Add a short description"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdown}>
          <Text style={styles.dropdownText}>{courseType}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            {['Starter', 'Main', 'Dessert'].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => { setCourseType(type); setModalVisible(false); }}
                style={styles.modalItem}
              >
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <TextInput
          placeholder="What is the price of this course?"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddCourse}>
          <Text style={styles.buttonText}>Add Course</Text>
        </TouchableOpacity>
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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60, 
  },
  buttonContainer: {
    position: 'absolute', 
    top: 10, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#5C0000',
    paddingVertical: 10, 
    paddingHorizontal: 15,
    borderRadius: 7,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16, 
    fontWeight: 'bold',
  },
  buttonSmall: {
    width: '30%', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dropdown: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
  },
  modalView: {
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalItem: {
    padding: 10,
  },
  addButton: {
    width: '60%',
    marginTop: 20,
  },
});
