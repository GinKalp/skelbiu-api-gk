async function validTryCatch(req, res, next, schema) {
    try {
        console.log(req.body)
        await schema.validateAsync(req.body, {abortEarly: false});
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(401).send({error: err.details.map(item => ({
                errorMsg: item.message,
                field: item.context.key
            }))});
    }
}

module.exports = {
    validTryCatch
};