const {dbAction, dbFail, dbSuccess} = require("../helpers/requestHelper");

module.exports = {
    modifyFavorite: async (req, res) =>{
        const userId = req.userId
        const {listingId} = req.params

        const sqlCheck = `SELECT * FROM favorites
                            WHERE user_id = ? && listing_id = ?`
        const dbDataCheck = await dbAction(sqlCheck, [userId, listingId])

        if (dbDataCheck.result.length === 0){
            const sqlAdd = `INSERT INTO favorites(user_id, listing_id)
                            VALUES(?,?)`
            // console.log(req.body)
            const dbDataAdd = await dbAction(sqlAdd, [userId, listingId])
            if (!dbDataAdd.isSuccess) return dbFail(res, 'error adding favorite')
            dbSuccess(res, 'favorite added')
        } else {
            const sqlDelete = `DELETE FROM favorites
                            WHERE user_id = ? && listing_id = ?`
            const dbDataDelete = await dbAction(sqlDelete, [userId, listingId])
            if (!dbDataDelete.isSuccess) return dbFail(res, 'error removing favorite')
            dbSuccess(res, 'favorite removed')
        }


    },
}