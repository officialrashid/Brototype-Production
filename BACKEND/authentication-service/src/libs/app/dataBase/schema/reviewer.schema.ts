import mongoose, { Types } from "mongoose";

const reviewerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    uniqueId: String,
    isStatus:{
        type:String,
        default : 'Active'
    },
    profileUrl: {type:String , default:""},
    createdDate: {
        type: Date,
        default: Date.now // Set default value to the current date
    }
});
const Reviewers = mongoose.model("Reviewers", reviewerSchema);

export {
    Reviewers,
};
