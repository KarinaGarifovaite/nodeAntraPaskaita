const mongoose = require("mongoose");
const validator = require('validator')

let PersonalSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Invalide email "]
    },

    adress: {
        type: String,
        required: true,
    },

    streetNumber: {
        type: Number,
        min: 1,
        required: true
    }
});

let PersonalInfo = mongoose.model("PersonalInfo", PersonalSchema);



module.exports = PersonalInfo;