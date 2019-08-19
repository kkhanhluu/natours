const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    // activate in gmail 'less secure app option'
  });
  // 2. Define the email options
  const mailOptions = {
    from: 'Kim Khanh Luu <luukhanh96@gmail.com>',
    to: 'luukhanh96@gmail.com',
    subject: options.subject,
    text: options.message
  };
  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
