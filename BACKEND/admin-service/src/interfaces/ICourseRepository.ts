import { ICourse } from "./ICourse";


export interface ICourseRepository{

    createCourse(coursDetails:ICourse):any 
    updateCourse(coursDetails:ICourse):any 
    deleteCourse(id:string):any 
    viewCourse():any

}