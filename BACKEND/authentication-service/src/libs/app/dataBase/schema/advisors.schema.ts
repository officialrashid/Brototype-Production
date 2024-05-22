import mongoose, { Types } from "mongoose";

const advisorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    uniqueId: String,
    isStatus: {
        type: String,
        default: 'Active'
    },
    createdDate: {
        type: Date,
        default: Date.now // Set default value to the current date
    },
    weeklyTask: { type: Number, default: 0 },
    weeklyTaskList: [],
    profileUrl: { type: String, default: "" },
    events: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        eventType: String,
        eventDescription: String,
        eventLocation: String,
        eventPlatform: String,
        startDate: String,
        endDate: String,
        startTime: String,
        endTime: String,
        conductedDate: Date
    }]
});
const Advisors = mongoose.model("Advisors", advisorSchema);

export {
    Advisors,
};
