const express = require("express");
const router = express.Router();

const confirmMail = require("../controller/customerController");
const validateReg = require("../middleware/validateReg");
const orderjsonschema = require("../schema/orderSchema");
const authRole = require("../middleware/validateRole");

router.post("/api/application/orderbooks",validateReg(orderjsonschema),authRole(['admin','user']),confirmMail);

module.exports = router;