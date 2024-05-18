import { IBranchInteractor } from "../interfaces/IBranchInteractor";
import { IBranchRepository, branchData } from "../interfaces/IBranchRepository";

export class BranchInteractor implements IBranchInteractor{

  private branchRepository:IBranchRepository
  constructor(branchRepository:IBranchRepository){
    this.branchRepository=branchRepository
  }
     addBranch(branchName: branchData) {
        return  this.branchRepository.createBranch(branchName)
     }

     editBranch(branchData:branchData) {
      return this.branchRepository.updateBranch(branchData)
         
     }

     deleteBranch(id: string) 
     
     {

      return this.branchRepository.deleteBranch(id)
         
     }
     getBranch() {
      return this.branchRepository.getBranches()
       
     }
     
}