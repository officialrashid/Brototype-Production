import { courseData } from "../entities/courseEntity";
import { ICourseRepository } from "../interfaces/ICourseRepository";
import { ICourse } from "../interfaces/ICourse";


export class CourseRepository implements ICourseRepository {


    async createCourse(courseDetails: ICourse) {
    let response;
    let exist:Boolean=false
        const courses = await courseData.find();
        if (courses.length) {
          for(let course of courses){
            if(course.courseName?.toLowerCase()===courseDetails?.courseName?.toLowerCase()){
               exist=true
            }
           
          }
        }

        if(exist){
             throw new Error('this course already exist')
        }
        else{
         response = await courseData.create(courseDetails);

            return response;

        }
      
    }
   async  updateCourse( courseDetails: ICourse) {
      
      const response=await courseData.findByIdAndUpdate(courseDetails.id,{courseDuration:courseDetails.courseDuration,courseName:courseDetails.courseName},{new:true})
          return response
    }
   async  deleteCourse(id: string) {
      const resposne=await  courseData.findByIdAndDelete(id)
      return resposne
    }
    async viewCourse() {
        const resposne = await courseData.find();

        return resposne;
    }

}
