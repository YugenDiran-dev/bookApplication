const books = require("../models/bookmodels")
const counter = require("../models/autoinc");

//shows all book in database
const showAllBooks = async () => {
    try {
        const findallbooks = await books.find();
    } catch (err) {
        throw err;
    }
    return findallbooks;
}

//enter a book in database
const enterBooks = async (storedValue, req, res) => {

    try {
        let seqId;
        const counterData = await counter.findOneAndUpdate(
            { id: "Autoval" },
            { "$inc": { "seq": 1 } },
            { new: true },
        )

        if (counterData == null) {
            const newval = new counter(
                { id: "Autoval", seq: 101 }
            )
            seqId = 1
            newval.save();

        } else {
            seqId = counterData.seq;
        }

        const { title, author, price, number_of_books } = storedValue;
        if (!title || !author || !price || !number_of_books) {
            res.status(400);
            throw new Error("Field Incomplete");
        }
        const postbooks = await books.create({
            bookId: seqId,
            title,
            author,
            price,
            number_of_books
        })
        return postbooks;

    } catch (err) {
        throw err;
    }
}

const getBook = async (id, req, res) => {

    try {
        const getbooks = await books.findOne({ bookId: id });
        if (!getbooks) {
            res.status(400);
            throw new Error("There's no book in this ID");
        }
    }
    catch (err) {
        throw err;
    }

    return getbooks;
}

const putbook = async (data) => {

    const id = data.bookId;
    const getbook = await books.findOne({bookId:id});
        if(!getbook){
            throw { status:400,message:"There's no book in this ID"}  
        }

    const newdata = {
        bookId:id,
        title:data.title,
        author:data.author,
        price:data.price,
        number_of_books:data.number_of_books
    }
    const updatebook = await books.findOneAndUpdate({ bookId: id }, newdata, { new: true });
    return updatebook;
}

const erasebook = async (id, req, res) => {

    try {
        const getbook = await books.findOne({ bookId: id });
        if (!getbook) {
            res.status(400);
            throw new Error("There's no book in this ID");
        }

        const ans = await books.findOneAndDelete({ bookId: id });
        if (!ans) {
            return res.status(400).json({ message: ans.message })
        }
    }
    catch (err) {
        throw err;
    }
    return ans;
}

module.exports = {showAllBooks,enterBooks,getBook,putbook,erasebook}