const nodemailer = require("nodemailer");
const env = require("dotenv").config();
const orderbooks = require("../models/orderbooks");
const books = require("../models/bookmodels")
const account = require("../models/registerSchema");

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
        quantity 

    }
    const msg = JSON.stringify(details);


    const transporter = nodemailer.createTransport(
        {
            secure: true,
            host:'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.SERVICE_EMAIL,
                pass: process.env.PASSWORD
            }
        }
    )
    

    function sendmail(to,sub,msg){
        transporter.sendMail({
            from:{
                name:"Book Library",
                address:process.env.SERVICE_EMAIL
            },
            to: to,
            subject: sub,
            html: `<h2> Your Orders: </h2><br><p>${msg}</p><br>
            <p><strong>Total Amount : ${TotAmount}</p><br>
            <h3>Thank You for shopping with us! :)`,
        
        })
        console.log("Email has been sent successfully");
    }
    
    sendmail(email,"Your Recent Book Orders",msg);

    return {status:201,message:"ordered successfully"};
}

module.exports = {checkdata}