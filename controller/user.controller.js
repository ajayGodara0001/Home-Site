import User from "../models/user.model.js"

const signupPageController = (req, res) => {
    res.render("signup.ejs")
}


const signupController = async (req, res, next) => {
    try {
        let { email, username, password } = req.body
        const user = new User({
            email, username
        })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, (err) => {
            if(err){
               return  next(err)
            }
            req.flash("success", "welcome to you")
            res.redirect("/listings")
        })
    } catch (error) {
        req.flash("error", "username already exist")
        res.redirect("/signup")
    }
}


const loginPageController = (req, res) => {
    res.render("login.ejs")
}

const logoutController =  (req, res, next) => {
    req.logout((err) => {
        if(err){
            next(err)
        }
        req.flash("success", "you logged out")
        res.redirect("/listings")
    })
}

const loginController = (async (req, res) => {
    req.flash("success", "welcome back")
    if(res.locals.redirectUrl){
        res.redirect( res.locals.redirectUrl)
    }
    res.redirect("/listings")
} 
)

export { signupPageController, signupController, loginPageController, logoutController, loginController }