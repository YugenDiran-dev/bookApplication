const nodemailer = require("nodemailer");

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


function sendmail(to,sub,msg){
    transporter.sendMail({
        from:{
            name:"Book Library",
            address:process.env.SERVICE_EMAIL
        },
        to: to,
        subject: sub,
        html: `<h2> Your Orders: </h2><br><p>${msg}</p><br>
        <p><strong>Total Amount : ${msg.TotAmount}</p><br>
        <h3>Thank You for shopping with us! :)`,
    
    })
    console.log("Email has been sent successfully");
}
