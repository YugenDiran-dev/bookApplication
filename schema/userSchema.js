const ajvInstance = require("./ajvInstance");

const regjsonschema = {
    type: "object",
    properties: {
        email: {type: "string", format :"email"},
        password: {type: "string"},
        role: {type: "string"}
    },
    required: ["email","password"],
    additionalProperties: false
  }
  
module.exports = ajvInstance.compile(regjsonschema)