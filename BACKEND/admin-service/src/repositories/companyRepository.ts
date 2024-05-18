import { companyData } from "../entities/companyEntity";
import { ICompanyRepository } from "../interfaces/IComanyRepository";
import { ICompanyInterface } from "../interfaces/ICompanyInterfaces";


export  class CompanyRepository implements ICompanyRepository{
    createCompanyData(placementCount: number, studentCount: number, academicCounsellorCount: number) {
        
    }
    async updateCompanyData(id: string, companyDetails:ICompanyInterface) {

     const response=await companyData.findByIdAndUpdate(id,{placementCount:companyDetails.placements,
    CourseCount:companyDetails.courses,studentCount:companyDetails.students,
academicCounselllorCount:companyDetails.counsellors},{new:true})

     console.log(response,'repo');
     
     return response
        
    }

    async getAllCompanyData() {

        const response=await companyData.find()
        return response
        
        
    }
    
}