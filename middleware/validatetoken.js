const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

const validateToken = asyncHandler(async (req, res, next) => {

    let authHeader = req.headers.authorization

    const token = authHeader.split(" ")[1] || authHeader;
    if (!token) {
        res.status(401);
        throw new Error("UnAuthorized login");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        if (!decoded) {
            res.status(403);
            throw new Error("Unauthorized");
        }
        console.log(decoded);
        req.role = decoded.user.role
        console.log("login as ",req.role);
        next();

})

module.exports = validateToken;