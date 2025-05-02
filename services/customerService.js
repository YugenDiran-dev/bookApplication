const env = require("dotenv").config();
const orderbooks = require("../models/orderbooks");
const books = require("../models/bookmodels")
const account = require("../models/registerSchema");
const sendEmail = require("../services/eventemitter")
const orderIdinc = require("../models/orderIdinc")


const checkdata = async(storeValues)=>{

    try {
        const { email, bookId, quantity, orderDate } = storeValues;

        const checkmail = await account.find({ email });
        if (!checkmail) {
            throw { status: 500, message: "something went wrong :(" }
        }
        const checkbookId = await books.findOne({ bookId });
        if (!checkbookId) {
            throw { status: 500, message: "something went wrong :(" }
        }

        let seqId;
        const counterData = await orderIdinc.findOneAndUpdate(
            { id: "autoval" },
            { "$inc": { "seq": 1 } },
            { new: true },
        )

        if (counterData == null) {
            const newval = new orderIdinc(
                { id: "autoval", seq: 1001 }
            )
            seqId = 1001
            newval.save();

        } else {
            seqId = counterData.seq;
        }

        const orderdata = await orderbooks.create({
            orderId: seqId,
            email,
            bookId,
            quantity,
            orderDate
        })

        const AmountSpent = quantity * checkbookId.price;
        const TotAmount = JSON.stringify(AmountSpent);

        const details = {
            Book_Name: checkbookId.title,
            price: checkbookId.price,
            quantity,
            TotAmount

        }

        const sub = "Your Recent Book Orders"

        sendEmail(email, sub, details);
    } catch (err) {
        throw err;
    }

    return {status:201,message:"ordered successfully"};
}

module.exports = {checkdata}