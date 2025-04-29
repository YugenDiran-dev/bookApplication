const books = require("../models/bookmodels")
const asynchandle = require("express-async-handler");

// Get all books

const getbooks = asynchandle(async(req,res)=>{
    const getAllBooks = await books.find();
    res.status(200).json(getAllBooks);
});

//post books
const postbooks = asynchandle(async(req,res)=>{

    const {bookId,title,author,price,number_of_books} = req.body;

    if(!bookId || !title || !author || !price ||!number_of_books){
        res.status(400);
        throw new Error("Field Incomplete");
    }
    const postbooks = await books.create({
        bookId,
        title,
        author,
        price,
        number_of_books
    })
    res.status(201).json({message:"Book created successfully"});
});

// get book by ID
const getbooksbyId = asynchandle(async(req,res)=>{
    const id = req.params.bookId ;
    const getbook = await books.findOne({bookId : id});
    if(!getbook){
        res.status(400);
        throw new Error("There's no book in this ID");
    }
    res.status(200).json(getbook);

});

//update 
const updateBooks = asynchandle(async(req,res)=>{
    const id = req.params.bookId;
    const getbook = await books.findOne({bookId : id});
    if(!getbook){
        res.status(400);
        throw new Error("Wrong ID");
    }
    const updatebook = await books.findOneAndUpdate({id:id}, req.body, {new : true});
    res.status(200).json({message:"updated successfully"});
    
});

//delete
const deletebooks = asynchandle(async(req,res)=>{

    const id = req.query.id;
    const getbook = await books.findOne(id);

    if(!getbook){
        res.status(400);
        throw new Error("Wrong ID");
    }
    await books.findOneAndDelete(getbook);
    res.status(200).json({message:"Deleted successfully"});
});

module.exports = {getbooks,postbooks,getbooksbyId,updateBooks,deletebooks}


/**
 * {
	"definitions": {},
	"$schema": "http://json-schema.org/draft-07/schema#", 
	"$id": "https://example.com/object1745553611.json", 
	"title": "Root", 
	"type": "object",
	"required": [
		"email"
	],
	"properties": {
		"email": {
			"$id": "#root/email", 
			"title": "Email", 
			"type": "string",
			"default": "",
			"examples": [
				"random234@gmail.com"
			],
			"pattern": "^.*$"
		}
	}
}
 
 */