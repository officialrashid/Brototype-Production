
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {createSuperlead_Usecase}
    } = dependencies
 const createSuperleadController = async (req:Request,res:Response)=>{
    const response = await createSuperlead_Usecase(dependencies).executeFunction(req.body)

    res.status(201).json(response)
    
 }
 return createSuperleadController;
}
