import mongoose, { Types } from "mongoose";

const superleadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    hubLocation: String,
    uniqueId: String,
    profileUrl: {type:String , default:""},
    createdDate: {
        type: Date,
        default: Date.now // Set default value to the current date
    },
});

const Superleads = mongoose.model("Superleads", superleadSchema);

export {
    Superleads,
};
