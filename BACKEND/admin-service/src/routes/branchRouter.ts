import express from 'express'
import { BranchRepository } from '../repositories/branchRepository'
import { BranchInteractor } from '../interactors/branchInteractor'
import { BranchController } from '../controllers/branchController'

const branchRouter=express.Router()
const branchRepository=new BranchRepository()
const branchInteractor=new BranchInteractor(branchRepository)
const branchController=new BranchController(branchInteractor)


branchRouter.get('/branch/all-branches',branchController.OnGetBranches.bind(branchController))
branchRouter.post('/branch/create-branch',branchController.onCreateBranch.bind(branchController))
branchRouter.post('/branch/update-branch',branchController.OnUpdateBranch.bind(branchController))
branchRouter.delete('/branch/delete-branch/:id',branchController.OnDeleteBranch.bind(branchController))

export {branchRouter}