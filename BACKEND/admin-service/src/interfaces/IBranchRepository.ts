
export interface branchData{
    branchLocation:string
    id?:string
}
export interface IBranchRepository{
    createBranch(branchData:branchData):any
    updateBranch(branchData:branchData):any
    deleteBranch(id:string):any
    getBranches():any
}