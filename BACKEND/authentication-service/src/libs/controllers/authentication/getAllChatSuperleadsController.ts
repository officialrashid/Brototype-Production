
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getAllChatSuperleads_Usecase}
    } = dependencies
 const getAllChatSuperleadsController = async (req:Request,res:Response)=>{
    const response = await getAllChatSuperleads_Usecase(dependencies).executeFunction()
    res.status(201).json(response)
    
 }
 return getAllChatSuperleadsController;
}
