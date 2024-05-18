
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {advisorGoogleLogin_Usecase}
    } = dependencies
 const advisorGoogleLoginController = async (req:Request,res:Response)=>{
    console.log(req.body,"email boduyyy yarrr");
    const {email} = req.body
   
    
    const response = await advisorGoogleLogin_Usecase(dependencies).executeFunction(email)
    res.status(201).json(response)
    
 }
 return advisorGoogleLoginController;
}
