const mysql = require('mysql2/promise');
const {dbConfig} = require('../dbConfig')

async function dbAction(sql, valuesArr = []){
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [result] = await conn.execute(sql, valuesArr);
        await conn.end();
        // console.log(result)
        // if (Array.isArray(result)){
        //     return {isSuccess: true, result: result.length > 1 ? result : result[0]}
        // }
        return {isSuccess: true, result}
    } catch (error) {
        console.log('/ got error ', error.message);
        return {isSuccess: false, error: error.message}
    }
}
function dbFail(res, errorText, statusCode = 500){
    return res.status(statusCode).send({error: errorText})
}
function dbSuccess(res, succText, result, statusCode = 200){
    return res.status(statusCode).send({msg: succText, data: result})
}

module.exports = {
    dbAction,
    dbFail,
    dbSuccess
}


