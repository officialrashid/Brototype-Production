
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {deleteEvent_Usecase}
    } = dependencies
 const deleteEventController = async (req:Request,res:Response)=>{
    const {eventId,coordinatorId} = req.params
    const response = await deleteEvent_Usecase(dependencies).executeFunction(eventId,coordinatorId)

    res.status(201).json(response)
    
 }
 return deleteEventController;
}
