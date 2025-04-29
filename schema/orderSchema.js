const { Type } = require("ajv/dist/compile/util");
const ajvInstance = require("./ajvInstance");

const orderjsonschema = {
    type:"object",
    properties:{
        orderId: {type: "integer" },
        email: {type: "string"},
        bookId:{type: "integer"},
        quantity:{type: "integer"},
        orderDate:{type: "integer"}
    },

    required: ["orderId","email","bookId","quantity","orderDate"],
    additionalProperties: false
}

module.exports = ajvInstance.compile(orderjsonschema);