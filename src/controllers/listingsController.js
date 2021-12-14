const {dbSuccess, dbAction, dbFail} = require("../helpers/requestHelper");
module.exports = {
    addNewListing: async (req, res) =>{
        const {title, body, price, user_id, category_id} = req.body
        const {filename} = req.file
        const sql = `INSERT INTO listings(title, body, price, user_id, category_id, image)
                            VALUES(?,?,?,?,?,?)`
        console.log(req.body)
        const dbData = await dbAction(sql, [...Object.values(req.body), filename])
       if (!dbData.isSuccess) return dbFail(res, 'error adding listing')
        dbSuccess(res, 'new listing added')
    },
    getAllListings: async (req, res) =>{
        const sql = `SELECT * FROM listings`
        const dbData = await dbAction(sql)
        if (!dbData.isSuccess) return dbFail(res, 'error getting listings')
        if (!dbData.result) return dbFail(res, 'no listings found')
        dbSuccess(res, 'got listings', dbData.result)
    },
}