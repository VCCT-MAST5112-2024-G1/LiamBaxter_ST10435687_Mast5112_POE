export type RootStackParams = {
    Home: undefined;  
    Menu: { courses: Course[] };  
    Courses: { courses: Course[] };  
    Filter: undefined;  
};

export type Course = {
    dishName: string;
    description: string; 
    courseType: string;  
    price: number;
};
