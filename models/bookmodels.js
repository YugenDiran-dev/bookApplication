const mongoose = require("mongoose");

const books = mongoose.Schema({
    
    bookId:{
        type:Number,
        unique: true
    },
    title :{
        type: String,
        required: true
    },
    author :{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    number_of_books:{
        type: Number,
        required: true
    },
},{
    timestamp : true
})

module.exports = mongoose.model("booksmanage",books);