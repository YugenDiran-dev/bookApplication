const books = require("../models/bookmodels")
const asynchandle = require("express-async-handler");
const {showAllBooks,enterBooks,getBook,putbook,erasebook} = require("../services/bookservice");

// Get all books

const getbooks = asynchandle(async(req,res)=>{
    const getAllBooks = await showAllBooks();
    res.status(200).json(getAllBooks);
});

//post books
const postbooks = asynchandle(async(req,res)=>{

    const storeValues = await enterBooks(req.body);
    if(!storeValues){
        res.status(500).json({message:"something went wrong"})
    }
    res.status(201).json({message:"Book created successfully"});
});

// get book by ID
const getbooksbyId = asynchandle(async(req,res)=>{
    const id = req.params.bookId ;
    const result = await getBook(id)
    if(!result){
        res.status(500).json({message:"something went wrong"})
    }
    res.status(200).json(result);

});

//update 
const updateBooks = asynchandle(async(req,res)=>{
    const data = req.body;
    const result = await putbook(data);
    if(!result){
        res.status(500).json({message:"something went wrong"})
    }
    res.status(200).json({message:"updated successfully"});
    
});

//delete
const deletebooks = asynchandle(async(req,res)=>{

    const id = req.params.bookId;
    const result = await erasebook(id);
    if(!result){
        res.status(500).json({message:"something went wrong"})
    }
    res.status(200).json({message:"Deleted successfully"});
});

module.exports = {getbooks,postbooks,getbooksbyId,updateBooks,deletebooks}
