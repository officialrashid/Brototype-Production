
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {deleteAdvisorCreatedTask_Usecase}
    } = dependencies
    const deleteAdviosrCreatedTaskController = async (req: Request, res: Response) => {
        const {taskId,taskType} = req.query
        const response = await deleteAdvisorCreatedTask_Usecase(dependencies)(taskId,taskType); // Fix the function call
        res.status(201).json(response);
      };
      
 return deleteAdviosrCreatedTaskController;
}
