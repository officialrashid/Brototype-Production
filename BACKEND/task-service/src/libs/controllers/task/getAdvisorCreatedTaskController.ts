
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getAdvisorCreatedTask_Usecase}
    } = dependencies
    const getAdviosrCreatedTaskController = async (req: Request, res: Response) => {
        const {technicalLeadId,week,taskType} = req.query
        console.log(technicalLeadId,week,taskType,"<><><>");
        
        const response = await getAdvisorCreatedTask_Usecase(dependencies)(technicalLeadId,week,taskType); // Fix the function call
        res.status(201).json(response);
      };
      
 return getAdviosrCreatedTaskController;
}
