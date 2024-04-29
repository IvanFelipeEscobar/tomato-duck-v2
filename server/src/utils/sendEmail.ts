import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import "dotenv/config";

const sendEmail = async (
  subject: string,
  send_to: string,
  send_from: string,
  reply_to: string,
  template: string,
  name: string,
  link: string
) => {
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: 587,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'quinn68@ethereal.email',
        pass: '1DTG2W1R5e1KGsA2y5'
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const options = {
    from: send_from,
    to: send_to,
    replyTo: reply_to,
    subject,
    template,
    context: {
      name,
      link,
    },
  };

transporter.use('compile', hbs({
    viewEngine: {
        extname: '.handlebars',
        partialsDir: path.resolve('./src/views'),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/views'),
    extName: '.handlebars'
}))
  transporter.sendMail(options, (err, info)=> {
    err ? console.log(err) : console.log(info)
  })
};
 export default sendEmail