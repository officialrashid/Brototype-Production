import { branchData } from "./IBranchRepository"


export interface IBranchInteractor{

    addBranch(branchData:branchData):any
    deleteBranch(id:string):any
    editBranch(branchData:branchData):any,
    getBranch():any

}