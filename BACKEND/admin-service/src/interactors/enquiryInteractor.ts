import { IEnquiryInteractor } from "../interfaces/IEnquiryInteractor";
import { IEnquiryRepository } from "../interfaces/IEnquiryRepository";


export class  EnquiryInteractor implements IEnquiryInteractor{

    private enquiryRepository:IEnquiryRepository

    constructor(enquiryRepository:IEnquiryRepository){
        this.enquiryRepository=enquiryRepository
    }
    getEnquiries() {
        
    }
}