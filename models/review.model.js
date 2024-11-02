import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
    comment:String,
    range:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
})

const Review = mongoose.model("Review", reviewSchema)

export { Review }