const env = require("dotenv").config();
const orderbooks = require("../models/orderbooks");
const books = require("../models/bookmodels")
const account = require("../models/registerSchema");
const sendEmail = require("../services/eventemitter")


const checkdata = async(storeValues)=>{
    const {orderId,email,bookId,quantity,orderDate} = storeValues;
    
    const checkmail = await account.find({email});
    if(!checkmail){
        throw {status:500, message:"something went wrong :("}
    }
    const checkbookId = await books.findOne({bookId});
    if(!checkbookId){
        throw {status:500, message:"something went wrong :("}
    }

    const orderdata = await orderbooks.create({
        orderId,
        email,
        bookId,
        quantity,
        orderDate
    })

    const AmountSpent = quantity *checkbookId.price;
    const TotAmount = JSON.stringify(AmountSpent);
    
    const details = {
        Book_Name : checkbookId.title,
        price : checkbookId.price,
        quantity ,
        TotAmount

    }
    
    const sub = "Your Recent Book Orders"


    sendEmail(email,sub,details);

    return {status:201,message:"ordered successfully"};
}

module.exports = {checkdata}