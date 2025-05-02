const mongoose = require("mongoose")

const orderIdInc = mongoose.Schema({
    id:{
        type:String,
    },
    seq:{
        type:Number
    }
},{timestamps:true})

module.exports = mongoose.model("orderIdcounters",orderIdInc)