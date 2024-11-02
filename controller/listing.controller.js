import { Listing } from "../models/listing.model.js"

const allListingController = (async (req, res) => {
    const allListings = await Listing.find()
    res.render("index.ejs", {allListings})
})

const deleteListingController = (async (req, res) => {
    let {id} = req.params
    await Listing.findByIdAndDelete(id)
    req.flash("success", "Listing deleted")
    res.redirect("/listings")
   
})

const updateListingController = (async (req, res) => {
    let {id} = req.params
    const {title, description, price, country, location, image} = req.body
    let listing  = await Listing.findByIdAndUpdate(req.params.id, {title, description, price, country, location, image} )

    if(typeof req.file !== "undefined"){
        const url = req.file.path
        const filename = req.file.filename
        listing.image = { url, filename }
        await listing.save()
    }
    req.flash("success", "Listing updated")
    res.redirect(`/listings/${id}`)
})

const newListController = (req, res) => {   
    res.render("new.ejs")
}

const editFormController = (async (req, res) => {  
    const listing = await Listing.findOne({_id: req.params.id});
    if (!listing) {
        req.flash("error", "Listing not exist")
      return  res.redirect("/listings")
    }

    let originalImage = listing.image.url
    originalImage = originalImage.replace("/upload", "/upload/w_250")
        
    res.render("edit.ejs", { listing , originalImage});   
})

const addNewListingController = (async (req, res, next) => {
    const url = req.file.path
    const filename = req.file.filename
    
    const {title, description, price, country, location, image} = req.body
    const newListing =  new Listing({
        title,
        description,
        price,
        location, 
        country,
        image
    })
    newListing.owner = req.user._id
    newListing.image = { url, filename }
    await newListing.save()
    req.flash("success", "New Listing Added")
    res.redirect("/listings")
})

const showTargetedListingController = (async (req, res) => {
   
    const listing = await Listing.findById(req.params.id).populate("owner").populate({path:"reviews", populate:{
        path:"author"
    }}); 
    if (!listing) {
        req.flash("error", "Listing not exist")
        res.redirect("/listings")
    }
    
    res.render("show.ejs", { listing });
})

export { allListingController, deleteListingController, updateListingController, newListController, editFormController, addNewListingController, showTargetedListingController }