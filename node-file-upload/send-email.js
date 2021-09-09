const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ih174test@gmail.com',
    pass: 'IHRMT102020@lis'
  }
});

transporter
  .sendMail({
    to: 'ih174test@gmail.com',
    subject: 'Hello from José',
    text: 'This is an email sent by José'
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
