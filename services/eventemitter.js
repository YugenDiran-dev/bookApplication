const nodemailer = require("nodemailer");
const EventEmitter = require("events")
class EmailManage extends EventEmitter{};

const emitter = new EmailManage();

emitter.on('sendmail', async({to,sub,msg}) => {

    try{
    const transporter = nodemailer.createTransport(
        {
            secure: true,
            host:'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.SERVICE_EMAIL,
                pass: process.env.PASSWORD
            }
        }
    )
    let mailOption = {
        from: "Online Book Library",
        to: to,
        subject:sub,
        html: `<h2> Your Orders: </h2><br><p>Book Name :${msg.Book_Name}<br>Price :${msg.price}<br>Quantity :${msg.quantity}</p><br>
            <p><strong>Total Amount :${msg.TotAmount}</p><br>
            <h3>Thank You for shopping with us! :)`
    }

    let info = await transporter.sendMail(mailOption)
    console.log("Email has been sent : "+info.response);
}catch(err){
    throw err;

}

})

function sendEmail(to,sub,msg){
        
    emitter.emit('sendmail',{to,sub,msg})
}

module.exports = sendEmail;