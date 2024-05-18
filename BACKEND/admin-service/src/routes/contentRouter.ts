import express from 'express'
import { ContentRepository } from '../repositories/contentRepository'
import { ContentInteractor } from '../interactors/contentInteractor'
import { ContentController } from '../controllers/contentController'
import { upload } from '../middlewares/s3UploadClient'

const contentRouter=express.Router()

const contentRepository=new ContentRepository()
const contentInteractor=new ContentInteractor(contentRepository)
const contentController=new ContentController(contentInteractor)


contentRouter.get('/content/all-contents',contentController.onGetContent.bind(contentController))
contentRouter.post('/content/create-content',upload.single('contentImage'),contentController.onCreateContent.bind(contentController))
contentRouter.post('/content/update-content',upload.single('contentImage'),contentController.onEditContent.bind(contentController))
contentRouter.delete('/content/delete-content/:id',contentController.onDeleteContent.bind(contentController))

export {contentRouter}