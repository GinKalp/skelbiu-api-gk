const {dbSuccess, dbAction, dbFail} = require("../helpers/requestHelper");

module.exports = {
    getAllListings: async (req, res) =>{
        const authHeader = req.headers.authorization;

        if (authHeader.split(' ')[1] === 'null'){
            const sql = `SELECT l.id, l.category_id, l.body, l.image, l.price, l.title, l.user_id, u.username, u.town, c.name as cat_name FROM listings as l
                        LEFT JOIN users as u 
                        ON l.user_id = u.id
                        LEFT JOIN categories as c 
                        ON l.category_id = c.id`

            const dbData = await dbAction(sql)
            if (!dbData.isSuccess) return dbFail(res, 'error getting listings')
            if (!dbData.result) return dbFail(res, 'no listings found')
            return dbSuccess(res, 'got listings', dbData.result)
        }

        const userId = req.userId

        const sql = `SELECT l.id, l.category_id, l.body, l.image, l.price, l.title, l.user_id, f.user_id as fav_user, u.username, u.town, c.name as cat_name FROM listings as l
                        LEFT JOIN favorites as f 
                        ON l.id = f.listing_id && f.user_id = ?
                        LEFT JOIN users as u 
                        ON l.user_id = u.id
                        LEFT JOIN categories as c 
                        ON l.category_id = c.id`

        const dbData = await dbAction(sql, [userId])

        if (!dbData.isSuccess) return dbFail(res, 'error getting listings')
        if (!dbData.result) return dbFail(res, 'no listings found')
        dbSuccess(res, 'got listings(logged in)', dbData.result)
    },
    getListingsByUser: async (req, res) =>{
        const id = req.userId
        const sql = `SELECT l.id, l.category_id, l.body, l.image, l.price, l.title, l.user_id, u.username, u.town, c.name as cat_name FROM listings as l
                        LEFT JOIN users as u 
                        ON l.user_id = u.id
                        LEFT JOIN categories as c 
                        ON l.category_id = c.id
                        WHERE user_id = ?`
        const dbData = await dbAction(sql, [id])
        if (!dbData.isSuccess) return dbFail(res, 'error getting listings')
        if (!dbData.result) return dbFail(res, 'no listings found')
        dbSuccess(res, 'got listings', dbData.result)
    },
    addNewListing: async (req, res) =>{
        const userId = req.userId

        const {title, body, price, category_id} = req.body
        const file = req.file
        console.log(file)
        let sql
        let dbData
        if (!file){
            // if sent without image
            sql = `INSERT INTO listings(title, body, price, category_id, image, user_id)
                            VALUES(?,?,?,?,?,?)`
            console.log(req.body)
            const body = {...req.body, image: 'dummy-image.jpg'}

            dbData = await dbAction(sql, [...Object.values(body), userId])

        } else {
            // if sent with image
            sql = `INSERT INTO listings(title, body, price, category_id, user_id, image)
                            VALUES(?,?,?,?,?,?)`
            console.log(req.body)
            dbData = await dbAction(sql, [...Object.values(req.body), userId, file?.filename ])
        }

        if (!dbData.isSuccess) return dbFail(res, 'error adding listing')
        dbSuccess(res, 'new listing added')
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
        if (!dbData.isSuccess) return dbFail(res, 'error updating listing')
        dbSuccess(res, 'listing updated')
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
    },
    getCategories: async (req, res) =>{
        const sql = `SELECT * FROM categories`
        const dbData = await dbAction(sql)

        if (!dbData.isSuccess) return dbFail(res, 'error getting categories')
        if (dbData.result.length === 0) return dbFail(res, 'error getting categories', 404)
        dbSuccess(res, 'got categories', dbData.result)
    },
}