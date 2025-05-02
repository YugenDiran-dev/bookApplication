const mongoose = require("mongoose")

const orderBooks = mongoose.Schema({

    orderId:{
        type: Number,
        unique:true
    },
    email:{
        type: String,
        ref:'accounts'
    },
    bookId:{
        type: Number,
        ref:'bookmanages',
    },
    quantity:{
        type: Number,
        required: true
    },
    orderDate:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("orderbook",orderBooks);