const express = require("express");
const router = express.Router();
const {getbooks,postbooks,getbooksbyId,updateBooks,deletebooks} = require("../controller/booksController")
const validateReg = require("../middleware/validateReg");
const authRole = require("../middleware/validateRole");
const bookjsonschema = require("../schema/bookSchema");

router.get("/api/application/books", authRole(['admin','user']), getbooks)
router.post("/api/application/books", validateReg(bookjsonschema), authRole(['admin']), postbooks);
router.get("/api/application/books/:bookId", authRole(['admin','user']), getbooksbyId)
router.put("/api/application/books/:bookId", authRole(['admin']), updateBooks)
router.delete("/api/application/books/:bookId",authRole(['admin']), deletebooks);


module.exports = router;
