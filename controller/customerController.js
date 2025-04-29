const books = require("../models/bookmodels");
const nodemailer = require("nodemailer");
const {checkdata} = require("../services/customerService");


const confirmMail = async(req,res)=>{

    try{
        const {orderId,email,bookId,quantity,orderDate} = req.body;
        if(!orderId || !email || !bookId || !quantity ||!orderDate){
            res.status(400);
            throw new Error("Field Incomplete");
        }

        const storeValue = ({orderId,email,bookId,quantity,orderDate});

        const result = await checkdata(storeValue);
        res.status(result.status).json({message:result.message})

    }catch(err){
        throw err;
    }
}
module.exports = confirmMail