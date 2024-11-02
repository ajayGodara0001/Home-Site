import { wrapApi } from "../utils/wrapApi.js"
import express from "express"
const router = express.Router()

// multer
import multer from "multer"
import { storage } from "../cloudinaryConfig.js"
const upload = multer({ storage })


// middleware import
import {isLogIn, isOwner} from "../middleware/isLogIn.js"
import {validateListing} from "../middleware/isLogIn.js"


//   import controller
import { allListingController } from "../controller/listing.controller.js"
import { deleteListingController } from "../controller/listing.controller.js"
import { updateListingController } from "../controller/listing.controller.js"
import { newListController } from "../controller/listing.controller.js"
import { editFormController } from "../controller/listing.controller.js"
import { addNewListingController } from "../controller/listing.controller.js"
import { showTargetedListingController } from "../controller/listing.controller.js"



//  routes
router.route("/")
    .get(wrapApi(allListingController))
    .post(isLogIn, upload.single('image'), validateListing, wrapApi(addNewListingController))

router.get("/new", isLogIn, newListController )

router.route("/:id")
    .delete(isLogIn, isOwner, wrapApi(deleteListingController))
    .put(isLogIn, upload.single('image'), validateListing,  wrapApi(updateListingController))
    .get(wrapApi(showTargetedListingController))


router.get("/:id/edit", isLogIn, isOwner, wrapApi(editFormController))





export default router