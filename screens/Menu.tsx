
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParams } from './RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';

interface Course {
  dishName: string;
  description: string;
  courseType: string;
  price: number;
}

// other imports...

export default function MenuScreen() {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const { courses } = (route.params as { courses: Course[] }) || { courses: [] };

  const totalCourses = courses.length;

  const typePriceMap: { [key: string]: { count: number; total: number; average: number } } = {
    Starter: { count: 0, total: 0, average: 0 },
    Main: { count: 0, total: 0, average: 0 },
    Dessert: { count: 0, total: 0, average: 0 },
  };

  courses.forEach((course) => {
    if (typePriceMap[course.courseType]) {
      typePriceMap[course.courseType].count += 1;
      typePriceMap[course.courseType].total += course.price;
    }
  });

  Object.keys(typePriceMap).forEach((type) => {
    const count = typePriceMap[type].count;
    typePriceMap[type].average = count > 0 ? typePriceMap[type].total / count : 0;
  });

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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Filter', { courses })}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Courses', { courses })}>
          <Text style={styles.buttonText}>Add Course</Text>
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
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.dishName}
        ListHeaderComponent={ListHeader}
        style={styles.list}
      />
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
});
