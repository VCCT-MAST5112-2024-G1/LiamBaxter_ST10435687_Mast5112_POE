export type RootStackParams = {
    Home: undefined;  
    Menu: { courses: Course[] };  
    Courses: undefined;  
    Filter: undefined;  
};

export type Course = {
    dishName: string;
    description: string; 
    courseType: string;  
    price: number;
};
