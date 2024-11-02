import { Router } from "express"
import { wrapApi } from "../utils/wrapApi.js"
const router = Router({mergeParams: true})

//  import middlewares
import {isLogIn, isAuthor} from "../middleware/isLogIn.js"
import { validateReview } from "../middleware/isLogIn.js"


// import controllers
import { addReviewController } from "../controller/review.controller.js"
import { deleteReviewController } from "../controller/review.controller.js"


// routes
router.route("/")
    .post(validateReview, isLogIn, wrapApi(addReviewController))

router.route("/:reviewId")
    .delete(isLogIn,isAuthor, wrapApi(deleteReviewController))


export default router