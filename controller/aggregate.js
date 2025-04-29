const books = require("../models/bookmodels")
const asynchandle = require("express-async-handler");
const {getEachUser,priceOfEachUser,orderQuantity,ordercount,spentMost} = require("../services/aggergateservice")
const {singlebookorder,orderonce,eachmonth,morespent,avgprice} =require("../services/aggregate2service");

const EachUserAndBooks = async(req,res)=>{

    const result = await getEachUser();
    res.status(200).json(result);
}

const totalAmountOfUser = async(req,res)=>{

    const getUser = await priceOfEachUser();
    res.status(400).json(getUser);
}

const topbooksByQuanity = async(req,res)=>{
    const fds = await orderQuantity();
    res.status(200).json(fds);
}

const orderByEachbook = async(req,res)=>{
    const orderUser = await ordercount();
    res.status(200).json(orderUser);
}

const topUserspent = async(req,res)=>{
    const userspent = await spentMost();
    res.status(200).json(userspent);

}

const userByHighQuantity = async(req,res)=>{
    const highquantity = await singlebookorder();
    res.status(200).json(highquantity);
}

const orderedByOnce = async(req,res)=>{
    const OrderOnce = await orderonce();
    res.status(200).json(OrderOnce);
}

const bestsellBook = async(req,res)=>{
    const bestSellingBook = await eachmonth();
    res.status(200).json(bestSellingBook);
}

const spentmore = async(req,res)=>{
    const spent = await morespent();
    res.status(200).json(spent);
}

const averageprice = async(req,res)=>{
    const averageprice = await avgprice();
    res.status(200).json(averageprice);
}

module.exports = {EachUserAndBooks,totalAmountOfUser,topbooksByQuanity,orderByEachbook,topUserspent,userByHighQuantity,orderedByOnce
    ,bestsellBook,spentmore,averageprice
};