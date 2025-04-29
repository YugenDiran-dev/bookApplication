const account = require("../models/registerSchema")
const {registerUser,loginUser} = require("../services/registerService")



//get
const getAccount = async (req, res) => {

    const acc = await account.find();
    return res.status(200).json(acc)
}

//post
const postAccount = async (req, res) => {

    console.log(req.body);
    try {
        const { email, password, role } = req.body;
        const storeValues = ({ email, password, role });
        const result = await registerUser(storeValues);
        res.status(result.status).json({ message: result.message });
    } catch (err) {
        throw (err);
    }

}
//login
const loginAccount = async (req, res) => {
    try {

        const { email, password } = req.body;
        const validAccount = ({ email, password });
        const Message = await loginUser(validAccount);
        res.status(Message.status).json(Message)
    } catch (err) {
        throw (err);
    }
}

module.exports = {getAccount,postAccount,loginAccount};
