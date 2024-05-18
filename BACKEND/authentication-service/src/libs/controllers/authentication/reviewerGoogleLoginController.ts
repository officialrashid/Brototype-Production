
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {reviewerGoogleLogin_Usecase}
    } = dependencies
 const reviewerGoogleLoginController = async (req:Request,res:Response)=>{
    console.log(req.body,"email boduyyy yarrr");
    const {email} = req.body
    console.log(email,"email coming yarrr");
    const response = await reviewerGoogleLogin_Usecase(dependencies).executeFunction(email)
    res.status(201).json(response)
    
 }
 return reviewerGoogleLoginController;
}
