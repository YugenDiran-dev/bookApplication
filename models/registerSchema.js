const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const registerschema = mongoose.Schema({

    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum:['admin','user'],
        default:'user'
    }
},{
    timestamps: true
})



module.exports = mongoose.model("accounts",registerschema);