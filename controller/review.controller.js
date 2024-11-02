import { Listing } from "../models/listing.model.js"
import { Review } from "../models/review.model.js"

const addReviewController = (async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    const newReview = new Review(req.body.review)
    newReview.author = req.user._id
    listing.reviews.push(newReview)
    
    await newReview.save()
    await listing.save()
    req.flash("success", "New Review Added")
    res.redirect(`/listings/${listing._id}`)
    
})

const deleteReviewController = (async (req, res) => {
    let{id, reviewId} = req.params
        await Review.findByIdAndDelete(reviewId)
        await Listing.findByIdAndUpdate(id, {$pull: {reviews:reviewId}})
        req.flash("success", "Review deleted")
        res.redirect(`/listings/${id}`)
    }
)


export { addReviewController, deleteReviewController }