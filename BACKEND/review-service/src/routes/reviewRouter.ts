import express from "express";
import { ReviewRepository } from "../repositories/ReviewRepository";
import { ReviewInteractor } from "../interactors/reviewInteractor";
import { ReviewController } from "../controllers/reviewController";
const reviewRouter=express.Router()
const reviewRepository=new ReviewRepository()
const reviewInteractor=new ReviewInteractor(reviewRepository)
const reviewController=new ReviewController(reviewInteractor)





reviewRouter.get('/assigned-reviews',reviewController.onGetCoordinatorsReview.bind(reviewController))
reviewRouter.get('/coordinator-reviews/:coordinatorId',reviewController.OnGetScheduledReviews.bind(reviewController))
reviewRouter.post('/update',reviewController.onUpdateReviewBooking.bind(reviewController))
reviewRouter.get('/meeting-link/:coordinatorId/:reviewId',reviewController.OngetMeetingLink.bind(reviewController))
reviewRouter.get('/student-review/:studentId',reviewController.OnGetStudentReview.bind(reviewController))
reviewRouter.patch('/update-meeting-link/',reviewController.OnMeetingLinkUpdation.bind(reviewController))
reviewRouter.post('/extend-request',reviewController.OnExtendRequestsSend.bind(reviewController))
reviewRouter.get('/extend-requests/:coordinatorId',reviewController.OnGetExtendReqsForCoordinators.bind(reviewController))
reviewRouter.get('/student-extend-requests/:studentId',reviewController.OnGetStudentExtendRequests.bind(reviewController))
reviewRouter.get('/change-extend-request-status',reviewController.OnChangeStudentExtendStatus.bind(reviewController))

export {reviewRouter,reviewController}