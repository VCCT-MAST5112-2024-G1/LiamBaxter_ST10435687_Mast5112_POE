import React, { useState } from 'react';
import { Text, View, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

  const [courses, setCourses] = useState<Course[]>([]);
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

    
    setCourses(prevCourses => [...prevCourses, newCourse]);

    navigation.navigate('Menu', { courses: [...courses, newCourse] });

    setDishName('');
    setDescription('');
    setCourseType('Starter');
    setPrice('');
  };

  return (
    <ImageBackground source={require('../img/form.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonLeft}>
            <Button title="Back" onPress={() => navigation.navigate('Home')} />
          </View>
          <View style={styles.buttonRight}>
            <Button title="Filter" onPress={() => navigation.navigate('Filter')} />
          </View>
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
          placeholder="What is the price of this dish?"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Button title="ADD" onPress={handleAddCourse} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  dropdown: {
    width: '80%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  dropdownText: {
    color: '#000',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalItem: {
    padding: 15,
    backgroundColor: '#fff',
    width: '80%',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  buttonLeft: {
    width: '20%',
  },
  buttonRight: {
    width: '20%',
  },
});