const jwt = require('jsonwebtoken');
const User = require('./user-model')

authenticate = async (req, res, next) => {
    let token = req.header("todo-auth");
    try {
        let decoded = await jwt.verify(token, 'superSecret')
        let user = await User.findOne({
            _id: decoded._id,
            "sessionToken.token": token
        })
        if (!user) throw "Authentication failed"
        req.user = user;
        req.token = token
        next();
    } catch (err) {
        err = err.message == 'jwt malformed' ? "Wrong session token" : err;
        res.status(401).json(err)
    }


};

module.exports = {
    authenticate,
};