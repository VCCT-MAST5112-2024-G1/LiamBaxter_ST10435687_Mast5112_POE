import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  Modal, 
  Button 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParams } from './RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';

interface Course {
  dishName: string;
  description: string;
  courseType: string;
  price: number;
}

export default function MenuScreen() {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const { courses } = (route.params as { courses: Course[] }) || { courses: [] };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);


const [localCourses, setLocalCourses] = useState(courses);

useEffect(() => {
  if (courses && courses.length > 0) {
    setLocalCourses(courses); 
  }
}, [courses]); 


  const totalCourses = localCourses.length;

  const typePriceMap: { [key: string]: { count: number; total: number; average: number } } = {
    Starter: { count: 0, total: 0, average: 0 },
    Main: { count: 0, total: 0, average: 0 },
    Dessert: { count: 0, total: 0, average: 0 },
  };

  localCourses.forEach((course) => {
    if (typePriceMap[course.courseType]) {
      typePriceMap[course.courseType].count += 1;
      typePriceMap[course.courseType].total += course.price;
    }
  });

  Object.keys(typePriceMap).forEach((type) => {
    const count = typePriceMap[type].count;
    typePriceMap[type].average = count > 0 ? typePriceMap[type].total / count : 0;
  });

  // Area to handle deleting of courses
  const handleDelete = () => {
    if (selectedCourse) {
      console.log("Deleting course:", selectedCourse);
      const updatedCourses = localCourses.filter((course) => course.dishName !== selectedCourse);  
      setLocalCourses(updatedCourses); 
      setSelectedCourse(null); 
      setModalVisible(false); // Closes modal
    }
  };
  //How the course item is displayed
  const renderItem = ({ item }: { item: Course }) => (
    <View style={styles.courseItem}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text>{item.description}</Text>
      <Text>Type: {item.courseType}</Text>
      <Text>Price: R{item.price.toFixed(2)}</Text>
    </View>
  );

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.heading}>Christoffel's Menu</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filter', { courses: localCourses })}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Courses', { courses: localCourses })}>
          <Text style={styles.buttonText}>Add Course</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Delete Course</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.summary}>Total Courses: {totalCourses}</Text>
        {Object.keys(typePriceMap).map((type) => (
          <Text key={type} style={styles.summary}>
            {type}: {typePriceMap[type].count} items, Average: R{typePriceMap[type].average.toFixed(2)}
          </Text>
        ))}
      </View>
      <View style={styles.separator} />
    </View>
  );

  return (
    <ImageBackground source={require('../img/menu.jpg')} style={styles.background}>
      <FlatList
        data={localCourses}  
        renderItem={renderItem}
        keyExtractor={(item) => item.dishName}
        ListHeaderComponent={ListHeader}
        style={styles.list}
      />
      
      
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Select a Course to Delete</Text>
          {localCourses.map((course) => (
            <TouchableOpacity
              key={course.dishName}
              style={[styles.modalItem, selectedCourse === course.dishName && styles.selectedItem]}
              onPress={() => setSelectedCourse(course.dishName)}
            >
              <Text>{course.dishName}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.modalActions}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Delete" onPress={handleDelete} />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  list: {
    width: '100%',
    padding: 20,
  },
  courseItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginVertical: 5,
  },
  dishName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5C0000',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    width: '30%',
    backgroundColor: '#5C0000',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingLeft: 1,
  },
  textContainer: {
    width: '100%',
    textAlign: 'left',
    marginTop: 20,
    marginLeft: 10,
  },
  separator: {
    height: 10,
    backgroundColor: 'black',
  },
  headerContainer: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  modalItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: '#f0c0c0',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
