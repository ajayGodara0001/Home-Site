import express from "express"
import { wrapApi } from "../utils/wrapApi.js"
import passport from "passport"
import { saveRedirectUrl } from "../middleware/isLogIn.js"
const router = express.Router()

//  import controllers
import { signupPageController } from "../controller/user.controller.js"
import { signupController } from "../controller/user.controller.js"
import { loginPageController } from "../controller/user.controller.js"
import { logoutController } from "../controller/user.controller.js"
import { loginController } from "../controller/user.controller.js"

import { allListingController } from "../controller/listing.controller.js"
// routes
router.route("/")
    .get(wrapApi(allListingController))

router.route("/signup")
    .get(signupPageController )
    .post(wrapApi(signupController))

router.route("/login")
    .get(loginPageController)
    .post(saveRedirectUrl, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), wrapApi(loginController))

router.route("/logout")
    .get(logoutController );


export default router