const express = require("express");
const router = express.Router();
const {postAccount,loginAccount} = require("../controller/registerController")
const validateReg = require("../middleware/validateReg");
const regjsonschema = require("../schema/userSchema");



router.post("/api/application/register",validateReg(regjsonschema),postAccount)
router.post("/api/application/login",validateReg(regjsonschema),loginAccount)


module.exports = router;