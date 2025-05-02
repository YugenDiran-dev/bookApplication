const mongoose = require("mongoose")

const counterInc = mongoose.Schema({
    id:{
        type:String,
    },
    seq:{
        type:Number
    }
},{timestamps:true})

module.exports = mongoose.model("counters",counterInc)