
import { Request,Response } from "express";

// get All fumigatio pending students
export default (dependencies:any)=>{
    const {
        useCase: {getEnqueryGraph_Usecase}
    } = dependencies
 const getEnqueryGraphController = async (req:Request,res:Response)=>{
    try{
        const response = await getEnqueryGraph_Usecase(dependencies).excutefunction() // call the excute function define to usecase
        res.status(201).json(response) // return response
    } catch(err){
        res.status(500).json({err:"Internal Server Error"}) //  handle exception
    }
 
 }
 return getEnqueryGraphController; 
}
