
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {editEvent_Usecase}
    } = dependencies
 const editEventController = async (req:Request,res:Response)=>{
    const {event,coordinatorId} = req.body
    const response = await editEvent_Usecase(dependencies).executeFunction(event,coordinatorId)

    res.status(201).json(response)
    
 }
 return editEventController;
}
