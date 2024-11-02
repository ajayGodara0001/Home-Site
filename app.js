import express from "express"
import 'dotenv/config'
import connectDb from "./init/dbConnection.js"
import path from "path"
import methodOverride from "method-override"
import ejsMate  from "ejs-mate"
import apiError from "./utils/apiError.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import flash from "connect-flash"
import passport from "passport"
import LocalStrategy from "passport-local"

// models
import User from "./models/user.model.js"


// dotenv
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

//    session options

const store = MongoStore.create({
    mongoUrl:`${process.env.MDB_URL}/${process.env.MDB_NAME}`,
    touchAfter: 24 * 3600,
    crypto: {
        secret: process.env.SECRET
    }
})
store.on("error", () => {
    console.log("error in Mongo db atlas in session: ", err);  
})

const sessionOption = {
    store,
    secret: process.env.SECRET,
    rersave:false,
    saveUninitialized: true,
    Cookie:{
        expires: Date.now() +  2 * 24 * 60 * 60 * 1000,
        maxAge:  2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
}




//  express
const app = express()
const port  = process.env.PORT || 4000
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate);
app.use(express.static(path.join("./", "public")))


import { allListingController } from "./controller/listing.controller.js"
import { wrapApi } from "./utils/wrapApi.js"

// import routes
import listingRouter from "./routes/listing.route.js"
import reviewRouter  from "./routes/review.route.js"
import userRouter from "./routes/user.route.js"


// session
app.use(session(sessionOption))
app.use(flash())


//  passport 
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user
    next()
})



//  use routes
app.use("/listings", listingRouter)
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter)



app.set('view engine', 'ejs');
app.set("views", path.join("./", "view"))



app.listen(port, (req,res) =>{
    console.log(`server is listening at port ${port}`);
    
})
app.all("*", (req, res, next) => {
    next(new apiError(404, "page not found"))
})

app.use((err,req, res, next) => {
    let {statusCode=500, message="somthing went wrong"} = err
    res.status(statusCode).render("error.ejs", {message})
    // res.status(statusCode).send(message);   
})
connectDb()