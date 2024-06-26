import mongoose, { Schema, Types } from "mongoose";

const groupMessageSchema=new Schema ({

    groupId:{type:Schema.Types.ObjectId,required:true},
    senderId:{type:Schema.Types.ObjectId,required:true},
    senderFirstName:{type:String,required:false},
    senderLastName:{type:String,required:false},
    content:{type:String,required:true},
    type:{type:String,required:true},
    read:{type:Boolean , required:true ,default:false}

},{
    timestamps:true
})

const GroupMessages = mongoose.model("GroupMessages", groupMessageSchema);

export {
    GroupMessages,
};



