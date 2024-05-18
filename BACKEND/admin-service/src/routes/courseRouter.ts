import express from 'express'
import { CourseRepository } from "../repositories/CourseRepository.1"
import { courseController } from '../controllers/courseController'
import { CourseInteractor } from '../interactors/courseInteractor'
import {upload} from '../middlewares/s3UploadClient'

const courseRouter= express.Router()

const repository=new CourseRepository()
const interactor= new CourseInteractor(repository)
const controller= new courseController(interactor)




courseRouter.post('/course/add-course',upload.single('image'),controller.onCreateCourse.bind(controller))
courseRouter.delete('/course/delete-course/:id', controller.onDeleteCourse.bind(controller))
courseRouter.post('/course/update-course',upload.single(''),controller.onUpdateCourse.bind(controller))
courseRouter.get('/course/get-all-courses', controller.onGetCourse.bind(controller))


export default courseRouter