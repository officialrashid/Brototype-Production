import express from 'express'
import { EnquiryRepository } from '../repositories/enquiryRepository'
import { EnquiryInteractor } from '../interactors/enquiryInteractor'
import { EnquiryController } from '../controllers/enquiryController'

const enquiryRouter=express.Router()




const enquiryRepository=new EnquiryRepository()
const enquiryInteractor=new EnquiryInteractor(enquiryRepository)
const enquiryController= new EnquiryController(enquiryInteractor)

enquiryRouter.get('/enquiry/all-enquiries',enquiryController.OnGetEnquiry.bind(enquiryController))


export {enquiryRouter}