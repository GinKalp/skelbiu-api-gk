const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;


    if (authHeader.split(' ')[1] === 'null') {
        next()
        console.log(authHeader.split(' ')[1])

    } else {

        const token = authHeader && authHeader.split(' ')[1];
        // console.log('token', token);
        if (!token) return res.status(401).json({error: 'unauthorized request'});

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                return res.status(403).json({error: 'token expired/invalid'});
            }
            // console.log('data in jwt', data);
            req.user = data.username;
            req.userId = data.userId;
            // console.log(req.user, req.userId)
            next();
        });
    }
}

function dbSuccessResultWithToken(dbData) {
    const userToBeEncrypted = {
        username: dbData.result[0].username,
        userId: dbData.result[0].id
    }

    const token = jwt.sign(userToBeEncrypted, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
    return {username: userToBeEncrypted.username, userId: userToBeEncrypted.userId, token}
}

module.exports = {
    authenticateToken,
    dbSuccessResultWithToken
}