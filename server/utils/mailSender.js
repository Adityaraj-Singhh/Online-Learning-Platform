// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })


//             let info = await transporter.sendMail({
//                 from: 'StudyNotion || CodeHelp - by Babbar',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log(error.message);
//     }
// }


// module.exports = mailSender;





const sgMail = require('@sendgrid/mail');

const mailSender = async (email, title, body) => {
  try {
    // Set SendGrid API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: process.env.MAIL_USER, // Must be a verified sender in SendGrid
      subject: title,
      html: body,
    };

    const info = await sgMail.send(msg);
    console.log("Mail sent successfully:", info);
    return info;
  } catch (error) {
    console.log("Mail sending error:", error.message);
    if (error.response) {
      console.error("SendGrid error details:", error.response.body);
    }
    throw error;
  }
};

module.exports = mailSender;
