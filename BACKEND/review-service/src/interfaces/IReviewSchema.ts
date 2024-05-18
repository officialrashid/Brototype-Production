import mongoose from "mongoose"

export interface IReview{
    studentId:mongoose.Schema.Types.ObjectId,
    reviewerId:mongoose.Schema.Types.ObjectId,
    reviewStatus:String,
    reviewDate:Date,
    assignedDate:Date,
    conductedDate:Date,
    extendStatus:String

}
export interface IReviewSchema{
    coordinatorId:mongoose.Schema.Types.ObjectId,
    reviews:IReview[]
}