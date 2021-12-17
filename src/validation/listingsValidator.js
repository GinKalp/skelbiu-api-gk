const Joi = require('joi')
const {validTryCatch} = require("../helpers/validationHelper");

async function validateListing(req, res, next){
    const schema = Joi.object({
        title: Joi.string().min(2).max(25).required(),
        body: Joi.string().min(2).required(),
        price: Joi.number().required(),
        category_id: Joi.number().required(),
        image: Joi.string()
    })
    validTryCatch(req, res, next, schema);
}

module.exports = {
    validateListing
}