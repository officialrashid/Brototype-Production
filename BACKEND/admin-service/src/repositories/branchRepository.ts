import mongoose from "mongoose";
import { companyData } from "../entities/companyEntity";
import { IBranchRepository, branchData } from "../interfaces/IBranchRepository";



export class BranchRepository implements IBranchRepository{
    
    async createBranch(branchName:branchData) {
         console.log('create branch is existinf');
         
          const company=await companyData.find()
          console.log(company.length,'[[[');
          
        let exist:boolean=false
        console.log('helllooooooooo');
        
         

         
         if(company.length>=1)
         {
            const branchArray=company[0].branches
            console.log('ngth exist    ');
            console.log(branchArray);
            
           for(let i=0;i<branchArray.length;i++){
             let location:any=branchArray[i].branchLocation
             console.log(location);
             console.log(branchName);
             const {branchLocation}=branchName
             console.log(branchLocation,'////');
             
            if(location?.toLowerCase()==branchLocation.toLowerCase()){
                exist=true
                console.log(exist);
                break;
                
            }
           }
              
              if(exist){
                console.log('entering to the exist');
                
                throw new Error('This branch locations is existing')
              }
              else{
                console.log('i am entering');
                 console.log(branchName);
                 
                let response=   company[0].branches.push({branchLocation:branchName.branchLocation})
                   
               console.log(response,'hello');
               
                return company[0].save()
              }

         }
         else{
            console.log('new data coming');
            console.log('mmmmm');
            
            let response=await  companyData.create({branches:[branchName]})
            console.log(response);
            return response  

         }
        }
         
         
          
    
    async updateBranch(branchData:branchData) {
      let company=await companyData.find()
     let branches=company[0].branches
      

     let index:number=0
     console.log('hellloooooo',branchData.id);
     
       for(var branch of branches){
 
      console.log(new mongoose.Types.ObjectId(branchData.id).toString(),'ll');
      
        if(branch._id == new mongoose.Types.ObjectId(branchData.id).toString()){
            console.log('enterd');
            branch.branchLocation=branchData.branchLocation
           break;
        }
        index=index+1

       }

       
       return  company[0].save()
        
    }
   async deleteBranch(id: string) 
    
    {
     let company=await companyData.find()
     let branches=company[0].branches
      

     let index:number=0
     console.log('hellloooooo',id);
     
       for(var branch of branches){
 
      
      
        if(branch._id == new mongoose.Types.ObjectId(id).toString()){
            console.log('enterd');
            
           break;
        }
        index=index+1

       }

       branches.splice(index,1)
       return  company[0].save()
        
    }
    async getBranches() {
        const company= await companyData.find()
      console.log(company);
      
        return company[0].branches
    }
}
