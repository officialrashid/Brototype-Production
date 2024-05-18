import { ICourse } from "./ICourse";


export interface ICourseInteractor{

    addCourse(courseDetails:ICourse):any
    editCourse(courseDetails:ICourse):any
    deleteCourse(id:string):any
    getCourse():Promise<ICourse[]>

}