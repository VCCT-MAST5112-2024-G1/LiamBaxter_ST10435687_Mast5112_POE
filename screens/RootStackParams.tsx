
export type RootStackParams = {
    Home: undefined;  
    Menu: { courses: Course[] };  
    Courses: { courses: Course[] };  
    Filter: { courses: Course[] };    
};

export type Course = {
    dishName: string;
    description: string; 
    courseType: string;  
    price: number;
};
