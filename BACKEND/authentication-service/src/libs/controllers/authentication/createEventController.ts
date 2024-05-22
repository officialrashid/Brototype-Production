
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {createEvent_Usecase}
    } = dependencies
 const createEventController = async (req:Request,res:Response)=>{
    const {event,coordinatorId} = req.body
    const response = await createEvent_Usecase(dependencies).executeFunction(event,coordinatorId)

    res.status(201).json(response)
    
 }
 return createEventController;
}
