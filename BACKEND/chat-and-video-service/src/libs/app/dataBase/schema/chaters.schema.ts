import mongoose, { Schema } from "mongoose";


const chatersSchema =new mongoose.Schema(
    {
        chaterId: { type: Schema.Types.ObjectId, required: true },
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        phone: { type: Number},
        imageUrl: { type: String, required: false }, // changed default value to empty string
        isOnline: {
            type: Boolean,
            default: false
        },
        lastSeen: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
);

const Chaters = mongoose.model("Chaters", chatersSchema);

export { Chaters };
