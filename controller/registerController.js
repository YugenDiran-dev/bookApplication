const {registerUser,loginUser} = require("../services/registerService")


//post
const postAccount = async (req, res) => {

    console.log(req.body);
    try {
        const { email, password} = req.body;
        const storeValues = ({ email, password });
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

module.exports = {postAccount,loginAccount};
