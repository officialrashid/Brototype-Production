import { ICourseRepository } from "../interfaces/ICourseRepository";
import { ICourse } from "../interfaces/ICourse";
import { ICourseInteractor } from "../interfaces/ICourseInteractor";



export class CourseInteractor implements ICourseInteractor{
    private courseRepository:ICourseRepository

    constructor(courseRepository:ICourseRepository){
        this.courseRepository=courseRepository
    }

    addCourse(courseDetails: ICourse) {

        return this.courseRepository.createCourse(courseDetails)
        
    }


    editCourse(courseDetails: ICourse) {
       return  this.courseRepository.updateCourse(courseDetails)
        
    }
    deleteCourse(id: string) {
       return  this.courseRepository.deleteCourse(id)
        
    }
    getCourse(): any {
        return this.courseRepository.viewCourse()
        
    }
}