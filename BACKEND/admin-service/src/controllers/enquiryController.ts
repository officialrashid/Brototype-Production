import { IEnquiryInteractor } from "../interfaces/IEnquiryInteractor";
import { Request,Response } from "express";

export class EnquiryController{

    private enquiryInteractor:IEnquiryInteractor

    constructor(enquiryInteractor:IEnquiryInteractor){
        this.enquiryInteractor=enquiryInteractor
    }

    OnGetEnquiry(req:Request,res:Response){

    }
}