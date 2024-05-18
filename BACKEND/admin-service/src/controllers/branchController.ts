import { IBranchInteractor } from "../interfaces/IBranchInteractor";
import { Request,Response } from "express"
import { branchData } from "../interfaces/IBranchRepository";

export class BranchController{
    private branchInteractor:IBranchInteractor

    constructor(branchInteractor:IBranchInteractor){
        this.branchInteractor=branchInteractor
    }
    async onCreateBranch(req:Request,res:Response){
        try{
        console.log('branchhhhhh');
        
            let branchData:branchData={branchLocation:'',id:''}
            branchData=req.body
            
            if(!branchData.id){
                const response= await this.branchInteractor.addBranch(branchData)
                return res.json(response)

            }else{
                const response= await this.branchInteractor.editBranch(branchData)
                return res.json(response)

            }
           
        }
        catch(error){
        }
    }

    async OnGetBranches(req:Request,res:Response){
        try{

            const response =await this.branchInteractor.getBranch()
            console.log(response,'controller');
            
               return res.json(response)

        }
        catch(error){

        }

    }

    async OnUpdateBranch(req:Request,res:Response){
        try{

            

        }
        catch(error){

        }
    }
    async OnDeleteBranch(req:Request,res:Response){
        try{
            const branchId:string=req.params.id
              const respon=this.branchInteractor.deleteBranch(branchId)
              return res.json(respon)
        }
        catch(error){
            
        }
    }


}