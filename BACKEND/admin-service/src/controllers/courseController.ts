import { ICourse } from "../interfaces/ICourse";
import { ICourseInteractor } from "../interfaces/ICourseInteractor"
import { Request,Response } from "express";
interface multerRequest extends Request {
    file:any
}
export class courseController{


    private courseInteractor:ICourseInteractor
    constructor(courseInteractor:ICourseInteractor){
        this.courseInteractor=courseInteractor
    }

 async onCreateCourse(req:Request,res:Response){
  try{
    console.log(req.body);
console.log(req.file,'imageeee');

    const courseDetails:ICourse=req.body
    courseDetails.courseImageUrl= (req as any).file.location
    if(!courseDetails.id){
       
        // if( req as multerRequest req.file && req.file.location){
        //     courseDetails.courseImageUrl=req.file.location
        // }
        console.log(courseDetails);
        const response= await this.courseInteractor.addCourse(courseDetails)
        console.log(response);
        console.log('heelooooooooo this is my'); 
        return res.json(response)  

    }else{

        const response= await this.courseInteractor.editCourse(courseDetails)
        return res.json(response)

    }
   
  }catch(error){
    console.log('error displayeddddd')  
    console.log(error,'lll');
    return res.status(400).json(error) 
  }
 }

 async onGetCourse(req:Request,res:Response){
    try{
        const response=await this.courseInteractor.getCourse()
           return res.json(response)
        

    }catch(error){
        return res.status(400).json({error:error})

    }
 }

 async onDeleteCourse(req:Request,res:Response){
    try{
        const id:string=req.params.id
        const response= await this.courseInteractor.deleteCourse(id)
        return res.json(response)

    }catch(error){
        return res.json({message:'error in deleteing '})

    }
 }

 async onUpdateCourse(req:Request,res:Response){
    try{
        console.log(req.body);
       const courseData:ICourse=req.body
      const response = await this.courseInteractor.editCourse(courseData)
      return res.json(response)
        
        

    }catch(error){
        
    }
 }

}