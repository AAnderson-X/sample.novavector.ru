// WHATSAPP
//
// function sendToWhatsApp(e) {
//   e.preventDefault();
//
//   let name = document.getElementById("name").value;
//   let phone = document.getElementById("phone").value;
//   let message = document.getElementById("message").value;
//
//   let text = `Новая заявка:%0AИмя: ${name}%0AТелефон: ${phone}%0AУслуга: ${message}`;
//
//   let url = `https://wa.me/79624944722?text=${text}`;
//
//   window.open(url, "_blank");
// }


// Ждем, пока весь HTML загрузится
document.addEventListener('DOMContentLoaded', function() {

  const form = document.getElementById('tg-form');

  // Проверяем, нашли ли мы форму, прежде чем вешать событие
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // ... твой остальной код отправки ...
      console.log("Форма найдена, отправка пошла!");
    });
  } else {
    console.error("Ошибка: Форма с id='tg-form' не найдена на странице!");
  }

});

// TELEGRAM

const TOKEN = "8772496210:AAFCDVGbm1IOw6lFkzc8bwg6Wkjh4qwW-e8";
const CHAT_ID = "779268768";
const url = `https://script.google.com/macros/s/AKfycbxqJgbVLAOBbwhY_X1_QcE3-Jio__rdfGA_7l3cS1Dn6vX8SD6KHjsMaZisf0jSzItW/exec`;

document.getElementById('tg-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Формируем текст сообщения
  let text = `<b>🔥 Новая заявка с сайта!</b>\n\n`;
  text += `<b>👤 Имя:</b> ${this.name.value}\n`;
  text += `<b>📞 Телефон:</b> ${this.phone.value}\n`;
  text += `<b>📝 Сообщение:</b> ${this.message.value || 'Пусто'}`; // Если текста нет, напишет "Пусто"

  fetch(URI_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: text
    })
  })
    .then(res => {
      if(res.ok) {
        // 1. Находим форму и блок успеха
        const form = document.getElementById('tg-form');
        const successBox = document.getElementById('success-message');

        // 2. Скрываем форму (она больше не нужна)
        form.style.display = 'none';

        // 3. Показываем сообщение об успехе
        successBox.style.display = 'block';

        // 4. Очищаем форму на всякий случай
        this.reset();
      } else {
        alert('Ошибка при отправке. Попробуйте снова.');
      }
    })
    .catch(err => alert('Техническая ошибка. Проверьте интернет.'));
});