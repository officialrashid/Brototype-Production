import { ICompanyInterface } from "./ICompanyInterfaces";


export interface ICompanyInteractor{
    addCompanyData(companyDetails:ICompanyInterface):any
    editCompanyData(id:string,comapanyDetails:ICompanyInterface):any
    getCompanyData():any
}