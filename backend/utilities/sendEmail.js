const nodemailer= require("nodemailer")

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
            user: "andythecat1328@hotmail.com",
            pass: "zgdonkzzmsmhmvky"
            }
    });
    const message={
        from: "MOUSE E SHOP <andythecat1328@hotmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transport.sendMail(message)
}

module.exports= sendEmail;