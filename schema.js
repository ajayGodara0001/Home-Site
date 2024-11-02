import Joi from "joi";

export const listingSchema =  Joi.object({

        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null)

})
export const reviewSchema =  Joi.object({
    
    review: Joi.object({
        range: Joi.string().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()

})