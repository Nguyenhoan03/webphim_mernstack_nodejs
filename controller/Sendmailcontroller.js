const nodemailer = require('nodemailer');

exports.sendEmail = (email, titlefilm, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'phehoan@gmail.com',
      pass: 'vvuj tdts oczl fgsy',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let content = `
    <div style="padding: 10px; background-color: #003375">
      <div style="padding: 10px; background-color: white;">
        <h4 style="color: #0085ff">cảm ơn bạn đã góp ý đánh giá phim</h4>
        <span style="color: black">Thư này được gửi từ một địa chỉ email chỉ được dùng để gửi thông báo và không nhận email gửi đến</span>
      </div>
    </div>
  `;

  let mailOptions = {
    from: 'Quản Trị Viên',
    to: email,
    subject: 'Thu nhận đánh giá của bạn cho phim ' + titlefilm,
    text: 'Thank you for your review',
    html: content,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email: ', err);
      return; 
    } else {
      console.log('Message sent: ' + info.response);
    }
  });
};
