const contactForm = document.querySelector('.contact-form');
let fullname = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // ajax経由でデータを送信

  let formData = {
    fullname: fullname.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };

  // フェッチAPIに後日実装してみる
  // データを送信するためにAjaxを使用
  let xhr = new XMLHttpRequest();
  // データをバックエンドに投稿するため 第二引数は投稿先のurl
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function () {
    console.log(xhr.status);  // ステータスコードをログに表示
    // サーバーからの応答受信をログに記録
    console.log(xhr.responseText);
    if (xhr.responseText == 'success') {
      // 正常送信したらアラートを出して全てを空白フォームに戻す
      alert('Email sent');
      fullname.value = '';
      email.value = '';
      subject.value = '';
      message.value = '';
    } else {
      alert('something went wrong!');
    }
  };
  xhr.send(JSON.stringify(formData));
});
