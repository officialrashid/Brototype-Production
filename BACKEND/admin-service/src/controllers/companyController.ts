import { ICompanyInteractor } from "../interfaces/IComapanyInteractor";
import { Request,Response } from "express";
import { ICompanyInterface } from "../interfaces/ICompanyInterfaces";

export class CompanyController {
    private companyInteractor:ICompanyInteractor
    constructor(companyInteractor:ICompanyInteractor){
        this.companyInteractor=companyInteractor
    }
   async onCreateCompanyData(req:Request,res:Response){
    try{
       

    }
    catch(error){

    }
   }

   async onGetCompanyData(req:Request,res:Response){
   try{
    const response=await this.companyInteractor.getCompanyData()
    console.log(response);
    
    return  res.json(response)

   }
   catch(error){
    res.json()

   }

   }
   async onUpdateCompanyData(req:Request,res:Response){
    try{
        const id:string=req.params.id
        const comapanyDetails:ICompanyInterface=req.body
        console.log(req.body,'kkkkkk');
        
            const response=await this.companyInteractor.editCompanyData(id,comapanyDetails)
            return res.json(response)

    }
    catch(error){
        return res.json(error)

    }
   }

    

}