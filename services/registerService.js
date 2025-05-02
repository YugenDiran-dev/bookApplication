const account = require("../models/registerSchema")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const registerUser = async(storeValues)=>{
     const {email,password} = storeValues;

     const check = await account.findOne({email:email})
     if(check == true){
        return{message:"You already have an account"};
     }

     try{
        
        let hashpassword;
        hashpassword = await bycrypt.hash(password,10)
        
        if(!email || !password){
            throw{ status:400 , message:"Field required"}
        } 

        const newUser = new account({
            email,
            password:hashpassword,
            role:'user'
        })

        await newUser.save();

     }catch(err){
        throw(err);
    }
    return {status:201 ,message:"Account created"};

} 

const loginUser = async(validAccount)=>{

    const {email,password} = validAccount;

    try{
        const check = await account.findOne({email:email})

        if(!check){
            throw{status:401,message:"UnAuthorized Login"};
        }

        const ismatch =  await bycrypt.compare(password,check.password);
        if(ismatch){
            const accessToken = jwt.sign({
                user:{
                    email:check.email,
                    role:check.role,
                }
            },process.env.ACCESS_TOKEN,{expiresIn: "1h"});
            return { status:200, accessToken};
        }
        else{
            throw new Error("Password incorrect");
        }
        
    }catch(err){
        throw(err);
    }
    
}



module.exports = {registerUser,loginUser};