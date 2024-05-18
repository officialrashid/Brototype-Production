
import { Request,Response } from "express";


export default (dependencies:any)=>{
    
    const {
        useCase: {updateTechnicalWorkout_Usecase}
    } = dependencies
    const updateTechnicalWorkoutController = async (req: Request, res: Response) => {
        
        const response = await updateTechnicalWorkout_Usecase(dependencies)(req.body); // Fix the function call
        res.status(201).json(response);
      };
      
 return updateTechnicalWorkoutController;
}
