const books = require("../models/bookmodels")

//shows all book in database
const showAllBooks = async()=>{
    const findallbooks = await books.find();
    return findallbooks;
}

//enter a book in database
const enterBooks = async(storedValue,req,res)=>{

    const {bookId,title,author,price,number_of_books} = storedValue;
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
        return postbooks;
}

const getBook = async(id,req,res)=>{

    const getbooks = await books.findOne({bookId : id});
    if(!getbooks){
        res.status(400);
        throw new Error("There's no book in this ID");
    }

    return getbooks;
}

const putbook = async(id,req,res)=>{
    const getbook = await books.findOne({bookId : id});
        if(!getbook){
            res.status(400);
            throw new Error("Wrong ID");
        }
        const updatebook = await books.findOneAndUpdate({id:id}, req.body, {new : true});
        return updatebook;
}

const erasebook = async(id,req,res)=>{

    // const getbook = await books.findOne({bookId : id});
    // if(!getbook){
    //     throw {status:400, message:"Wrong ID or No book available"}
    //     // res.status(400);
    //     // throw new Error("Wrong ID");
    // }
    const ans = await books.findOneAndDelete(id);
    if(!ans){
        res.status(400).json({message:ans.message})
    }

    return ans;


}

module.exports = {showAllBooks,enterBooks,getBook,putbook,erasebook}