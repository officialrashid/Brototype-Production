

export interface IReviewRepository{
    addReviewData(coordiantorsData:any,studentsData:any):any
    addScheduledReviews(id:string,scheduledReviews:any):any,
    addCoordinatorsReviews(scheduledReviews:any):any,
    coordinatorReviews(coordiantorId:String,type:string):any,
    addReviewBookingData(coordinatorId:string,reviewId:string,reviewerId:string,eventId:string,slotId:string,startTime:string,endTime:string,scheduledDate:string,cancel:Boolean):any,
    getIndividualCoordinatorReview(id:string):any,
    addReviewStatusUpdation(coordinatorId:string,reviewId:string,reviewStatus:string):any
    addmeetingLink(meetingLink:string,coordinatorId:string,reviwId:string):any
    findMeetingLink(coordinatorId:string,reviwId:string):any,
    findStudentreview(studentId:string):any
    updateExtendRequest(coordinatorId:string,reviewId:string,reason:string,extendDays:string):any
    findCoordinatorExtendReqs(coordinatorId:string):any
    findStudentExtendRequests(studentId:string):any
    updateExtendRequestByCoordinator(coordinatorId:string,reviewId:string,type:string):any
}

