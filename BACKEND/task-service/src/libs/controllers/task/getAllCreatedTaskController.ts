
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {getAllCreatedTask_Usecase}
    } = dependencies
    const getAllCreatedTaskController = async (req: Request, res: Response) => {
        const {technicalLeadId} = req.params
        const response = await getAllCreatedTask_Usecase(dependencies)(technicalLeadId); // Fix the function call
        res.status(201).json(response);
      };
      
 return getAllCreatedTaskController;
}
