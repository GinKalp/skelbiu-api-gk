const Joi = require('joi')
const {validTryCatch} = require("../helpers/validationHelper");

async function validateRegister(req, res, next){
    const schema = Joi.object({
        username: Joi.string().min(4).max(25).required(),
        password: Joi.string().min(6).required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .message("password can't include symbols"),
        repeatPassword: Joi.any().equal(Joi.ref('password'))
            .required()
            .messages({ 'any.only': 'passwords must match' }),
        town: Joi.string().required(),
        phone: Joi.string().min(9).required(),

    })
    validTryCatch(req, res, next, schema);
}
async function validateLogin(req, res, next){
    const schema = Joi.object({
        username: Joi.string().min(4).max(25).required(),
        password: Joi.string().min(6).required()
    })
    validTryCatch(req, res, next, schema);
}
module.exports = {
    validateRegister,
    validateLogin
}