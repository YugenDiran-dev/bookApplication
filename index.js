const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;

app.listen(PORT,(req,res)=>{
    console.log(`The server running in ${PORT}`);
})

mongoose.connect("mongodb://localhost:27017/Libmanagement").then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log(err);
})


app.use(express.json());

const registerRoutes = require("./routes/registerRouter");
const aggregateRouter = require("./routes/aggregaterouter");
const bookRouter = require("./routes/bookRouter");
const validateToken = require("./middleware/validatetoken");
const mail = require("./routes/orderRouter");


app.use(registerRoutes);
app.use(validateToken);
app.use(bookRouter);
app.use(aggregateRouter);
app.use(mail);
