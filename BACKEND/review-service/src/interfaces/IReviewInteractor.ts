
export interface IReviewInteractor{
    createReviewData(studentsData:any,coordinatorsData:any):any,
    scheduler(id:string,studentData:any,coordinatorData:any):any
    getCoordinatorReviewDetail(coordiantorId:string,type:string):any,
    reviewbookingUpdation(coordinatorId:string,reviewId:string,reviewerId:string,eventId:string,slotId:string,startTime:string,endTime:string,scheduledDate:string,cancel:Boolean):any
    coordinatorsReviews(coordinatorId:string):any,
    reviewStatusUpdation(coordinatorId:string,reviewId:string,reviewStatus:string):any
    meetingLinkUpdation(meetingLink:string,coordinatorId:string,reviwId:string):any
    getMeetingLink(coordinatorId:string,reviwId:string):any
    getStudentreview(studentId:string):any
    sendExtendRequest(coordinatorId:string,reviewId:string,reason:string,extendDays:string):any
    getCoordinatorExtendRequests(coordinatorId:string):any,
    studentExtendRequests(studentId:string):any
    updateExtendReqStatus(coordinatorId:string,reviewId:string,type:string):any
}

