const {dbSuccess, dbAction, dbFail} = require("../helpers/requestHelper");

module.exports = {
    addNewListing: async (req, res) =>{
        const userId = req.userId

        const {title, body, price, category_id} = req.body
        const {filename} = req.file
        const sql = `INSERT INTO listings(title, body, price, category_id, user_id, image)
                            VALUES(?,?,?,?,?,?)`
        console.log(req.body)
        const dbData = await dbAction(sql, [...Object.values(req.body), userId, filename])
        if (!dbData.isSuccess) return dbFail(res, 'error adding listing')
        dbSuccess(res, 'new listing added')
    },
    getAllListings: async (req, res) =>{
        const authHeader = req.headers.authorization;

        if (authHeader.split(' ')[1] === 'null'){
            const sql = `SELECT * FROM listings`

            const dbData = await dbAction(sql)
            if (!dbData.isSuccess) return dbFail(res, 'error getting listings')
            if (!dbData.result) return dbFail(res, 'no listings found')
            return dbSuccess(res, 'got listings', dbData.result)
        }

        const userId = req.userId

        const sql = `SELECT l.id, l.category_id, l.image, l.price, l.title, l.user_id, f.user_id as fav_user FROM listings as l
                        LEFT JOIN favorites as f 
                        ON l.id = f.listing_id && f.user_id = ?`

        const dbData = await dbAction(sql, [userId])

        if (!dbData.isSuccess) return dbFail(res, 'error getting listings')
        if (!dbData.result) return dbFail(res, 'no listings found')
        dbSuccess(res, 'got listings(logged in)', dbData.result)
    },
    getListingsByUser: async (req, res) =>{
        const id = req.userId
        const sql = `SELECT * FROM listings
                        WHERE user_id = ?`
        const dbData = await dbAction(sql, [id])
        if (!dbData.isSuccess) return dbFail(res, 'error getting listings')
        if (!dbData.result) return dbFail(res, 'no listings found')
        dbSuccess(res, 'got listings', dbData.result)
    },
    updateListing: async (req, res) =>{
        const {id} = req.params
        const userId = req.userId

        const {title, body, price, category_id, image} = req.body
        const file = req.file
        const sql = `UPDATE listings SET
                             title = ?, body = ?, price = ?, category_id = ?, user_id = ?, image = ?
                             WHERE id = ?`
        console.log(req.body)
        const bodyArr = req.body
        delete bodyArr.image

        const dbData = await dbAction(sql, [...Object.values(bodyArr), userId, file?.filename ? file?.filename : image, id])
        if (!dbData.isSuccess) return dbFail(res, 'error adding listing')
        dbSuccess(res, 'new listing added')
    },
    deleteListing: async (req, res) =>{
        const {id} = req.params
        const userId = req.userId

        const sql = `DELETE FROM listings
                        WHERE id = ? && user_id = ?`
        const dbData = await dbAction(sql, [id, userId])

        if (!dbData.isSuccess) return dbFail(res, 'error deleting listing')
        if (dbData.result.affectedRows === 1){
            dbSuccess(res, 'listing deleted')
        } else {
            dbFail(res, 'listings not found')
        }
    }
}