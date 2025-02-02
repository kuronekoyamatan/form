const express = require('express');
const app = express();

const nodemailer = require('nodemailer');
require('dotenv').config(); // .envから環境変数を読み込む

//開発時は5000ポートのローカルサーバー、本番は環境変数ループ番号
const PORT = process.env.PORT || 5000;

// 静的ファイルを使用するため追加
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/contactform.html');
});

app.post('/', (req, res) => {
  console.log(req.body);

  // nodemailerの設定
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // 環境変数からGmailアドレス取得
      pass: process.env.EMAIL_PASS, // 環境変数からアプリパスワードを取得
    },
  });

  // メールの設定
  const mailOptions = {
    from: req.body.email, // 送信元のメールアドレス
    to: 'yltm39890@gmail.com', // 宛先のメールアドレス
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
