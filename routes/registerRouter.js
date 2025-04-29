const express = require("express");
const router = express.Router();
const {getAccount,postAccount,loginAccount} = require("../controller/registerController")
const validateReg = require("../middleware/validateReg");
const regjsonschema = require("../schema/userSchema");
const validateToken = require("../middleware/validatetoken");
const authRole = require("../middleware/validateRole");


router.get("/api/application/user",validateToken,authRole(['admin']),getAccount)
router.post("/api/application/register",validateReg(regjsonschema),postAccount)
router.post("/api/application/login",validateReg(regjsonschema),loginAccount)


module.exports = router;