import { ICompanyRepository } from "../interfaces/IComanyRepository";
import { ICompanyInteractor } from "../interfaces/IComapanyInteractor";
import { ICompanyInterface } from "../interfaces/ICompanyInterfaces";


export class CompanyInteractor implements ICompanyInteractor{
    private companyRepository:ICompanyRepository


    constructor(companyRepository:ICompanyRepository){
        this.companyRepository=companyRepository
    }
    addCompanyData(companyDetails: ICompanyInterface) {
        
    }
    editCompanyData(id: string,companyDetails:ICompanyInterface) {
        return  this.companyRepository.updateCompanyData(id,companyDetails)


        
    }
    getCompanyData() {

        return this.companyRepository.getAllCompanyData()
        
    }
}