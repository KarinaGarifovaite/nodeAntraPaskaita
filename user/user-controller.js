const User = require("./user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

singUp = async (req, res) => {
    let user = new User(req.body);

    try {
        let createdUser = await user.save();
        res.json(createdUser);
    } catch (err) {
        res.status(400).json(err);
    }
};

login = async (req, res) => {
    try {
        let user = await User.findOne({
            username: req.body.username,
        });
        if (!user) throw "User does not exist";
        let response = await bcrypt.compare(req.body.password, user.password);
        if (!response) throw "Incorrect password";
        let token = await jwt
            .sign({
                _id: user._id.toHexString()
            }, "superSecret")
            .toString();
        user.sessionToken.push({
            token
        });
        await user.save();
        res.header("todo-auth", token).json(user);
    } catch (err) {
        res.status(401).json(err);
    }
};

logout = async (req, res) => {
    let token = req.token;
    let user = req.user;
    try {
        await user.update({
            $pull: {
                sessionToken: {
                    token
                }
            }
        })
        res.json('succesfull logout');
    } catch (err) {
        res.status(400).json(err)
    }

}

saveAvatar = async (req, res) => {
    let token = req.header('todo-auth');
    try {
        let savedPhoto = await User.findOneAndUpdate({
            "sessionToken.token": token
        }, {
            profileImageURL: req.file.path
        }, {
            new: true
        });
        res.json(savedPhoto);
    } catch (err) {
        res.status(400).json(err)
    }
}

getAvatar = async (req, res) => {
    let token = req.header('todo-auth');
    try {
        let user = await User.findOne({
            "sessionToken.token": token
        })
        res.json(user.profileImageURL);
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    singUp,
    login,
    logout,
    saveAvatar,
    getAvatar
};