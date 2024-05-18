import { ICompanyInterface } from "./ICompanyInterfaces"

export interface ICompanyRepository{
    createCompanyData(placementCount:number,studentCount:number,academicCounsellorCount:number):any
    updateCompanyData(id:string,companyDetails:ICompanyInterface):any
    getAllCompanyData():any
}