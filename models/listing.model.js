import mongoose, { Schema } from "mongoose";
import { Review } from "./review.model.js";


const listSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        default: 1000
    },
    image:{
        url:String,
        filename:String,
    },
    location:{
        type: String,
        required: true
    },
    reviews:[
        {
        type: Schema.Types.ObjectId,
        ref: "Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

listSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in:listing.reviews}})
    }
})
const Listing = mongoose.model("Listing", listSchema)

export { Listing }