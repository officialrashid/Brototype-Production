
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updateAdvisorDetails_Usecase}
    } = dependencies
 const updateAdvisorDetailsontroller = async (req:Request,res:Response)=>{
    const {advisorId,firstName,lastName,email,phone,profileUrl} = req.body
    const response = await updateAdvisorDetails_Usecase(dependencies).executeFunction(advisorId,firstName,lastName,email,phone,profileUrl)
    res.status(201).json(response)
    
 }
 return updateAdvisorDetailsontroller;
}
