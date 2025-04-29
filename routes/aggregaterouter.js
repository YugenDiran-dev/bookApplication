const express = require("express");
const router = express.Router();

const { EachUserAndBooks, totalAmountOfUser, topbooksByQuanity,
    orderByEachbook, topUserspent, userByHighQuantity, orderedByOnce, bestsellBook, spentmore, averageprice } = require("../controller/aggregate")

const authRole = require("../middleware/validateRole");

router.get("/api/application/showstats/eachuser", authRole(['admin']), EachUserAndBooks);
router.get("/api/application/showstats/totamount", authRole(['admin']), totalAmountOfUser);
router.get("/api/application//topquantity", authRole(['admin']), topbooksByQuanity);
router.get("/api/application/showstats/eachbook", authRole(['admin']), orderByEachbook);
router.get("/api/application/showstats/topuser", authRole(['admin']), topUserspent);
router.get("/api/application/showstats/userbyquantity", authRole(['admin']), userByHighQuantity)
router.get("/api/application/showstats/orderonce", authRole(['admin']), orderedByOnce)
router.get("/api/application/showstats/eachmonth", authRole(['admin']), bestsellBook)
router.get("/api/application/showstats/morespent", authRole(['admin']), spentmore)
router.get("/api/application/showstats/avgprice", authRole(['admin']), averageprice)

module.exports = router;