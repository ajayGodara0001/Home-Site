import { Listing } from "../models/listing.model.js"
import { Review } from "../models/review.model.js"
import { listingSchema, reviewSchema } from "../schema.js"
import apiError from "../utils/apiError.js"

const isLogIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error","please first Log in")
        return res.redirect("/login")
    }
    next()
}

const saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}
const isOwner = async (req, res, next) =>{
    let { id } = req.params
    let listing = await Listing.findById(id)
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "you are not owner of this listing")
        return  res.redirect(`/listings/${id}`)
    }
    next()
}

const isAuthor = async (req, res, next) => {
   let { id,reviewId} = req.params
   let review = await Review.findById(reviewId)
   if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error", "you are not author of this review")
    return res.redirect(`/listings/${id}`)
   }

      next()
}


const validateListing  = (req, res, next) => {
    let { error } =  listingSchema.validate(req.body)
    if(error){
        throw new apiError(400, error.details[0].message)
    }else{
        next()
    }
}


const validateReview  = (req, res, next) => {
    let { error } =  reviewSchema.validate(req.body)
    if(error){
       
        throw new apiError(400, error)
    }else{
        next()
    }
}
export  {isLogIn, saveRedirectUrl, isOwner, isAuthor, validateListing, validateReview}