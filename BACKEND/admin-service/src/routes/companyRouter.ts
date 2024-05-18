import express from 'express'
import { CompanyRepository } from '../repositories/companyRepository'
import { CompanyInteractor } from '../interactors/companyInteractor'
import { CompanyController } from '../controllers/companyController'


const companyRouter=express.Router()

const companyRepository=new CompanyRepository()
const companyInteractor= new CompanyInteractor(companyRepository)
const companyController= new CompanyController(companyInteractor)

companyRouter.get('/company/company-all-data',companyController.onGetCompanyData.bind(companyController))
companyRouter.post('/company/edit-company-data/:id',companyController.onUpdateCompanyData.bind(companyController))
companyRouter.post('/company/create-company-data',companyController.onCreateCompanyData.bind(companyController))
export {companyRouter}