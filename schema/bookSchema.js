const ajvInstance = require("./ajvInstance");

const bookjsonschema = {
    type: "object",
    properties: {
        bookId: {type: "integer" },
        title: {type: "string"},
        author:{type: "string"},
        price:{type: "integer"},
        number_of_books:{type: "integer"}
    },
    required: ["bookId","title","author","price","number_of_books"],
    additionalProperties: false
  }

  module.exports = ajvInstance.compile(bookjsonschema);